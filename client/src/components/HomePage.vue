<template>
  <div id="home-page">
    <alert></alert>
    <key-press key-event="keyup" :key-code="83" @success="activateSearch()" />
    <key-press key-event="keyup" :key-code="27" @success="deactivateSearch()" />
    <key-press key-event="keyup" :key-code="65" @success="addNote()" />
    <div class="content">
      <div class="title">quickjot</div>
      <div class="controls">
        <div class="input-section">
          <textarea
            :style="{ resize: this.isSearching ? 'none' : '' }"
            type="text"
            id="note-input"
            class="note-input"
            v-model="inputBody"
            :placeholder="inputText"
            @keydown="
              (e) => (e.keyCode == 13 && !e.shiftKey ? e.preventDefault() : '')
            "
            @keyup.enter="submitNote"
          />
          <div class="search-button">
            <font-awesome-icon
              v-tooltip="'Search'"
              class="topButton"
              id="search-button"
              @click="search()"
              size="2x"
              icon="magnifying-glass"
              color="#b1b4ba"
            />
          </div>
        </div>
        <div class="topButtons">
          <font-awesome-icon
            v-tooltip="'Help'"
            class="topButton grow-on-hover"
            size="2x"
            icon="clipboard-question"
            @click="displayInfo()"
            id="cbq"
            color="#b1b4ba"
          />
          <font-awesome-icon
            v-tooltip="'Copy shareable collection'"
            class="topButton grow-on-hover"
            size="2x"
            icon="file-export"
            @click="exportCollection()"
            id="export-button"
            color="#b1b4ba"
          />
          <font-awesome-icon
            v-tooltip="'Delete collection'"
            class="topButton grow-on-hover"
            @click="clear()"
            :class="{ 'fa-shake': shouldShake }"
            size="2x"
            icon="bomb"
            color="#b1b4ba"
          />
        </div>
      </div>
      <div class="filter-section" v-if="itemsFiltered.length > 0">
        <div class="filter-message">
          {{ !this.reversed ? "" : "" }}
        </div>
        <font-awesome-icon
          v-tooltip="`Hide collection`"
          class="topButton top-collapse grow-on-hover"
          @click="() => collapseAll(false)"
          icon="angles-up"
          color="#b1b4ba"
        />
        <font-awesome-icon
          v-tooltip="`Show collection`"
          class="topButton top-collapse grow-on-hover"
          @click="() => collapseAll(true)"
          icon="angles-down"
          color="#b1b4ba"
        />
        <font-awesome-icon
          v-tooltip="`Change layout`"
          class="topButton grow-on-hover"
          @click="() => addToCols()"
          size="2x"
          id="layout-button"
          icon="grip"
          color="#b1b4ba"
        />
        <font-awesome-icon
          v-tooltip="`Sort`"
          class="topButton grow-on-hover"
          @click="() => (this.reversed = !this.reversed)"
          size="2x"
          id="sort-button"
          icon="sort"
          color="#b1b4ba"
        />
      </div>

      <div class="ui grid">
        <div :class="`${colsNumToStr} column row`">
          <note-card
            class="column"
            v-for="(item, idx) in itemsFiltered"
            :key="(item.id, idx)"
            :content="item"
            :isLast="idx == itemsFiltered.length - 1 ? true : false"
            :isSecondLast="idx == itemsFiltered.length - 2 ? true : false"
            :isThirdLast="idx == itemsFiltered.length - 3 ? true : false"
            :numCols="numCols"
            :lastAdded="lastAdded === item[0]"
            @deleteItem="deleteItem"
            @addItem="addItem"
          >
          </note-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteCard from "./NoteCard";

export default {
  name: "HomePage",

  components: {
    NoteCard,
  },

  data() {
    return {
      lastAdded: -1,
      inputBody: "",
      numCols: 1,
      items: [],
      shouldShake: false,
      isSearching: false,
      linknote: false,
      linknotes: false,
      reversed: false,
    };
  },

  mounted() {
    this.getItems();
    if ("linknote" in this.$route.query) {
      this.linknote = true;
      this.addItem(this.$route.query.linknote);
      this.$router.push(this.$route.path);
    } else if ("linknotes" in this.$route.query) {
      this.$route.query.linknotes
        .split(this.$route.query.joiner)
        .forEach((i) => this.addItem(i));
      this.$router.push(this.$route.path);
    }
  },

  computed: {
    colsNumToStr() {
      let colsMap = {
        1: "one",
        2: "two",
        3: "three",
      };
      return colsMap[this.numCols];
    },

    searchBody() {
      if (this.isSearching) {
        return this.inputBody;
      } else {
        return "";
      }
    },

    itemsFiltered() {
      let ret = this.items.filter((e) => e[1].match(this.searchBody));
      if (this.reversed) {
        ret.sort((a, b) => a[0] - b[0]);
      } else {
        ret.sort((a, b) => b[0] - a[0]);
      }
      return ret;
    },

    inputText() {
      if (this.isSearching) {
        return "Search for a note...";
      } else {
        return "Add a note";
      }
    },
  },

  methods: {
    collapseAll(show) {
      this.$emit("hideOrShowAll", show);
    },

    addToCols() {
      if (this.numCols === 3) {
        this.numCols = 1;
      } else {
        this.numCols += 1;
      }
    },

    displayInfo() {
      this.$alert.present(
        "Info",
        "This app uses local storage. Clearing cache will remove all notes.\n\n\nHotkeys:\n\nA: add note (enter to submit)\n\nS: search for note\n\nesc: unfocus textarea/stop searching or exit this modal\n\nshift + enter: for new line in textarea"
      );
    },

    addNote() {
      if (
        !document.getElementById("note-input") !== document.activeElement &&
        !this.isSearching
      ) {
        !document.getElementById("note-input").focus();
      }
    },

    deleteItem(key) {
      this.items.splice(this.items.map((e) => e[0]).indexOf(key), 1);
      localStorage.removeItem(key);
    },

    addItem(content) {
      let key = Date.now();
      let t = content;
      if (localStorage.getItem(key) !== null) {
        key += 1;
      }
      if (this.reversed) {
        if (content[-1] === "\n") {
          t = content.slice(0, -1);
        }
        this.items.push([key, t, true]);
      } else {
        this.items.unshift([key, t, true]);
      }
      localStorage.setItem(key, t);
      this.lastAdded = key;
    },

    async exportCollection() {
      let splitter = "_" + Math.random().toString(36).substr(2, 5);
      let items = this.items
        .map((i) => encodeURIComponent(i[1]))
        .join(splitter);
      let queryParams = `linknotes=${items}&joiner=${splitter}`;
      let url = `${location.protocol}//${location.host}${location.pathname}?${queryParams}`;
      if (url.length > 2048) {
        this.notify(
          "Error: Collection too large. Must be under 2000 characters."
        );
      } else {
        await navigator.clipboard.writeText(url);
        if (items.length === 0) {
          this.notify("Copied, but you might want to add some notes first...");
        } else {
          this.notify("Shareable collection link copied to clipboard.");
        }
      }
    },

    notify(message) {
      this.$notify({
        message,
        type: "",
        top: true,
        bottom: false,
        left: false,
        right: false,
        showClose: false,
        closeDelay: 3000,
      });
    },

    submitNote(e) {
      if (e.shiftKey) {
        return;
      }
      if (this.isSearching) {
        return;
      }
      this.addItem(this.inputBody);
      this.inputBody = "";
    },

    activateSearch(e) {
      if (
        !this.isSearching &&
        document.getElementById("note-input") !== document.activeElement
      ) {
        this.search();
      }
    },

    deactivateSearch(e) {
      if (this.isSearching) {
        this.search();
      }
      document.getElementById("note-input").blur();
    },

    search() {
      document.getElementById("note-input").focus();
      let icon = document.getElementById("search-button");
      this.isSearching = !this.isSearching;
    },

    getItems() {
      this.items = Object.entries(localStorage).filter((i) => i[0] != "randid");
    },

    clear() {
      this.shouldShake = true;
      this.items.forEach((e) => localStorage.removeItem(e[0]));
      this.getItems();
      setTimeout(() => {
        this.shouldShake = false;
      }, 1000);
    },
  },
};
</script>

<style>
.note-input::placeholder {
  color: rgba(1, 2, 0, 0.312);
}

.note-input {
  color: rgba(0, 0, 0, 0.83);
  border: 2px solid #d9dce2;
  transition: background-color 4000ms ease-out;
  line-height: 1.3em;
  box-shadow: 0 0px 0px rgba(255, 254, 254, 0.3),
    0 8px 8px rgba(186, 184, 184, 0.3);
  min-height: 80px;
  padding-left: 20px;
  background-color: rgba(255, 255, 255, 0.374);
  padding-top: 20px;
  padding-right: 20px;
  font-size: 15px;
  width: 100%;
  border-radius: 15px 15px 2px 15px;
  max-width: 93%;
}

.grow-on-hover:hover {
  transform: scale(1.15);
}

.input-section {
  width: 75%;
  display: flex;
}

.rotate-left {
  transform: rotate(360deg);
  transform: scale(1.1);
  transition-duration: 500ms;
}

.rotate-right {
  transform: rotate(90deg);
  transition-duration: 300ms;
}

.note-input:focus {
  border: 2px solid rgba(146, 137, 137, 0.661);
  outline: none;
}

.dndrop-draggable-wrapper {
  margin-left: auto;
  margin-right: auto;
}

#cbq {
  padding-right: 3px;
}

.filter-section {
  display: flex;
  margin-bottom: 9px;
}

.filter-message {
  margin-left: auto;
  font-size: 11px;
  padding-top: 5px;
  color: #bec2bb;
  margin-right: 9px;
}

.top-collapse {
  padding-top: 5px;
  font-size: 18px;
}

.topButton {
  margin-right: 10px;
}

.topButtons {
  margin-left: auto;
}

.topButton:hover {
  cursor: pointer;
}

.title {
  margin-left: 10px;
  font-family: monospace;
  display: flex;
  font-size: 22px;
  margin-top: 45px;
  margin-bottom: 20px;
  padding-left: 15px;
}

body {
  background-color: rgba(237, 237, 122, 0.248);
}

#search-button {
  margin-left: 5px;
  margin-top: 5px;
  font-size: 30px;
}

#sort-button {
  font-size: 25px;
  padding-top: 2px;
  margin-right: 8px;
}

#layout-button {
  margin-top: 0px;
  margin-right: 10px;
}

.controls {
  margin-left: 25px;
  display: flex;
}

#export-button {
  font-size: 23px;
  margin-left: 5px;
  margin-bottom: 1px;
}

body {
  padding-bottom: 10%;
}

#search-button {
  margin-left: 13px;
}

.content {
  text-align: center;
  margin-left: 15%;
  max-width: 55em;
}

/* Custom, iPhone Retina */
@media only screen and (max-width: 360px) {
  .search-button {
    margin-left: 20px;
  }

  .card-buttons {
    display: block;
  }
}

/* Extra Small Devices, Phones */
@media only screen and (max-width: 560px) {
  .filter-section {
    padding-right: 20px;
    margin-top: 0px;
  }

  .title {
    margin-top: 10px;
  }

  .search-button {
    margin-right: auto !important;
  }

  #export-button {
    font-size: 18px;
    margin-right: 5px;
  }

  .note-input {
    font-family: Helvetica;
    width: 80%;
  }

  #export-button {
    font-size: 25px;
    margin-left: 0px;
  }

  .card-button {
    font-size: 15px;
  }
}

/* Small Devices, Tablets */
@media only screen and (max-width: 768px) {
  .card-container {
    padding-top: 0px;
  }

  .card-header {
    display: block;
    text-align: center;
  }

  .card-buttons {
    margin-left: 0px;
    justify-content: center;
  }

  .content {
    margin-right: 1% !important;
  }

  .controls,
  .title {
    margin-left: 5px;
  }

  .note-card {
    padding-left: 15px;
  }

  #search-button {
    margin-left: 15px;
  }
}

/* Medium Devices, Desktops */
@media only screen and (max-width: 1000px) {
  .content {
    margin-left: 1% !important;
    max-width: 50em;
    padding-right: 15px;
  }
}

/* Large Devices, Wide Screens */
@media only screen and (max-width: 1300px) {
  .content {
    margin-right: 7%;
    margin-left: 3%;
  }
}
</style>
