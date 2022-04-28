<template>
  <div id="home-page">
    <div class="content">
      <div class="title">
        quicknote.
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
            @keyup.right="submitNote()"
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
            @click="() => (this.reversed = !this.reversed)"
            size="2x"
            id="sort-button"
            icon="sort"
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
</template>

<script>
import NoteCard from "./NoteCard";

export default {
  name: "HomePage",

  components: { NoteCard },

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
    this.getItems();
    if ("linknote" in this.$route.query) {
      this.linknote = true;
      this.addItem(this.$route.query.linknote);
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
        return ret.reverse();
      } else {
        return ret;
      }
    },

    inputText() {
      if (this.isSearching) {
        return "Search for a note...";
      } else {
        return "Add a note (right arrow key)...";
      }
    }
  },

  methods: {
    deleteItem(key) {
      this.items.splice(this.items.map(e => e[0]).indexOf(key), 1);
      localStorage.removeItem(key);
    },

    addItem(content) {
      let key = Date.now().toString();
      this.items.unshift([key, content]);
      localStorage.setItem(key, content);
    },

    exportCollection() {
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

    submitNote() {
      if (this.isSearching) {
        return;
      }
      this.linknote = false;
      this.addItem(this.inputBody);
      this.inputBody = "";
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
      this.items = Object.entries(localStorage)
        .reverse()
        .filter(i => i[0] != "randid");
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

<style scoped>
.note-input {
  height: 45px;
  border: 2px solid #b1b4ba;
  padding-left: 15px;
  padding-top: 10px;
  border-radius: 15px 15px 2px 15px;
  width: 93%;
}

.input-section {
  width: 70%;
}

.rotate-left {
  transform: rotate(360deg);
  transform: scale(1.2);
  transition-duration: 500ms;
}

.rotate-right {
  transform: rotate(90deg);
  transition-duration: 500ms;
}

.note-input:focus {
  border: 2px solid rgb(146, 137, 137);
  outline: none;
}

.dndrop-draggable-wrapper {
  margin-left: auto;
  margin-right: auto;
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

.controls {
  margin-bottom: 40px;
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

.content {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  padding-right: 70px;
  width: 40em;
}
</style>
