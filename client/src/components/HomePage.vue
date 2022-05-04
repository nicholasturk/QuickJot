<template>
  <div id="home-page">
    <alert>hi</alert>
    <key-press key-event="keyup" :key-code="83" @success="activateSearch()" />
    <key-press key-event="keyup" :key-code="27" @success="deactivateSearch()" />
    <key-press key-event="keyup" :key-code="65" @success="addNote()" />
    <div class="content">
      <div class="title">
        quickjot.
      </div>
      <div class="controls">
        <div class="input-section">
          <textarea
            :style="{ resize: this.isSearching ? 'none' : '' }"
            type="text"
            id="note-input"
            class="note-input"
            v-model="inputBody"
            :placeholder="inputText"
            @keyup.enter="submitNote"
          />
        </div>
        <div class="search-button">
          <font-awesome-icon
            class="topButton"
            id="search-button"
            @click="search()"
            size="2x"
            icon="magnifying-glass"
            rotation="90"
            color="#b1b4ba"
          />
        </div>
        <div class="topButtons">
          <font-awesome-icon
            class="topButton"
            size="2x"
            icon="clipboard-question"
            @click="displayInfo()"
            id="cbq"
            color="#b1b4ba"
          />
          <font-awesome-icon
            class="topButton"
            size="2x"
            icon="file-export"
            @click="exportCollection()"
            id="export-button"
            color="#b1b4ba"
          />
          <font-awesome-icon
            class="topButton"
            @click="clear()"
            :class="{ 'fa-shake': shouldShake }"
            size="2x"
            icon="bomb"
            color="#b1b4ba"
          />
        </div>
      </div>
      <div class="filter-section" v-if="items.length > 0">
        <div class="filter-message">
          {{ !this.reversed ? "new to old" : "old to new" }}
        </div>
        <font-awesome-icon
          class="topButton"
          @click="() => (this.reversed = !this.reversed)"
          size="2x"
          id="sort-button"
          icon="sort"
          color="#b1b4ba"
        />
      </div>

      <div class="cards">
        <note-card
          v-for="(item, idx) in itemsFiltered"
          :key="(item.id, idx)"
          :id="item[0]"
          :content="item"
          :newlyAdded="linknote && idx === 0"
          @deleteItem="deleteItem"
        ></note-card>
      </div>
    </div>
  </div>
</template>

<script>
import NoteCard from "./NoteCard";

export default {
  name: "HomePage",

  components: {
    NoteCard
  },

  data() {
    return {
      inputBody: "",
      items: [],
      shouldShake: false,
      isSearching: false,
      linknote: false,
      linknotes: false,
      reversed: false
    };
  },

  mounted() {
    document.getElementById("note-input").focus();
    this.getItems();
    if ("linknote" in this.$route.query) {
      console.log(this.$route.query.linknote);
      this.linknote = true;
      this.addItem(this.$route.query.linknote);
      this.$router.push(this.$route.path);
    } else if ("linknotes" in this.$route.query) {
      this.$route.query.linknotes
        .split(this.$route.query.joiner)
        .forEach(i => this.addItem(i));
      this.$router.push(this.$route.path);
    }
  },

  computed: {
    searchBody() {
      if (this.isSearching) {
        return this.inputBody;
      } else {
        return "";
      }
    },

    itemsFiltered() {
      let ret = this.items.filter(e => e[1].match(this.searchBody));
      if (this.reversed) {
        return ret.sort((a, b) => a[0] - b[0]);
      } else {
        return ret.sort((a, b) => b[0] - a[0]);
      }
    },

    inputText() {
      if (this.isSearching) {
        return "Search for a note...";
      } else {
        return "Add a note...";
      }
    }
  },

  methods: {
    displayInfo() {
      this.$alert.present(
        "Info",
        "This app uses local storage. Clearing cache will remove all notes.\n\nHotkeys:\nA -> add note\nS -> search for note\nesc -> unfocus textarea/stop searching or exit this modal"
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
      this.items.splice(this.items.map(e => e[0]).indexOf(key), 1);
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
        this.items.push([key, t]);
      } else {
        this.items.unshift([key, t]);
      }
      localStorage.setItem(key, t);
    },

    async exportCollection() {
      let splitter =
        "_" +
        Math.random()
          .toString(36)
          .substr(2, 5);
      let items = this.items.map(i => i[1]).join(splitter);
      let queryParams = `linknotes=${items}&joiner=${splitter}`;
      let url = `${location.protocol}//${location.host}${location.pathname}?${queryParams}`;
      await navigator.clipboard.writeText(url);
      this.notify("Shareable collection link copied to clipboard.");
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
        closeDelay: 3000
      });
    },

    submitNote(e) {
      if (e.shiftKey) {
        return;
      }
      if (this.isSearching) {
        return;
      }
      this.linknote = false;
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
      let icon = document.getElementById("search-button");
      icon.classList.remove("rotate-right");
      icon.classList.remove("rotate-left");
      this.isSearching = !this.isSearching;
      if (this.isSearching) {
        document.getElementById("note-input").focus();
        icon.classList.add("rotate-left");
      } else {
        icon.classList.add("rotate-right");
      }
    },

    getItems() {
      this.items = Object.entries(localStorage).filter(i => i[0] != "randid");
    },

    clear() {
      this.shouldShake = true;
      this.items.forEach(e => localStorage.removeItem(e[0]));
      this.getItems();
      setTimeout(() => {
        this.shouldShake = false;
      }, 1000);
    }
  }
};
</script>

<style>
.note-input {
  height: 65px;
  border: 2px solid #b1b4ba;
  padding-left: 15px;
  padding-top: 10px;
  padding-right: 10px;
  font-size: 15px;
  border-radius: 15px 15px 2px 15px;
  width: 93%;
  max-width: 93%;
}

.input-section {
  width: 68%;
}

.rotate-left {
  transform: rotate(360deg);
  transform: scale(1.2);
  transition-duration: 500ms;
}

.rotate-right {
  transform: rotate(90deg);
  transition-duration: 300ms;
}

.note-input:focus {
  border: 2px solid rgb(146, 137, 137);
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
  margin-top: 20px;
}

.filter-message {
  margin-left: auto;
  font-size: 11px;
  padding-top: 5px;
  color: #bec2bb;
  margin-right: 9px;
}

.topButton {
  font-size: 25px;
  margin-right: 10px;
  margin-top: 14px;
}

.topButtons {
  margin-left: auto;
}

.topButton:hover {
  cursor: pointer;
}

.title {
  display: flex;
  font-size: 30px;
  margin-top: 40px;
  margin-bottom: 30px;
  padding-left: 15px;
}

#search-button {
  margin-left: 5px;
  margin-top: 14px;
  font-size: 27px;
}

#sort-button {
  margin-top: 0px;
  margin-right: 5px;
}

#sort-button:hover {
  transform: scale(1.15);
}

.controls {
  display: flex;
}

.topButtons .topButton:hover {
  transform: scale(1.1);
}

#export-button {
  font-size: 22px;
  margin-left: 5px;
  margin-bottom: 1px;
}

body {
  filter: hue-rotate(180deg);
}

.content {
  text-align: center;
  margin-left: auto;
  padding-right: 50px;
  border-right: 2px dotted #b9bab1;
  margin-right: auto;
  max-width: 40em;
}

@media (max-width: 530px) {
  .content {
    border-right: 0px;
    padding-right: 0px;
  }
  #export-button {
    font-size: 18px;
    margin-right: 5px;
  }

  .note-input {
    width: 85%;
  }

  .topButton {
    margin-right: 2px;
    font-size: 20px;
  }

  .card-button {
    font-size: 12px;
  }
}
</style>
