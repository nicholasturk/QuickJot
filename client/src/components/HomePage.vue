<template>
  <div id="home-page">
    <div class="content">
      <div class="title">
        Quickjot.
      </div>
      <div class="controls">
        <textarea
          :style="{ resize: this.isSearching ? 'none' : '' }"
          type="text"
          id="note-input"
          class="note-input"
          v-model="noteBody"
          :placeholder="inputText"
          @keyup.enter="submitNote()"
        />
        <div class="topButtons">
          <font-awesome-icon
            class="topButton"
            id="search-button"
            @click="search()"
            size="2x"
            icon="magnifying-glass"
            rotation="90"
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
      <container
        :get-ghost-parent="getGhostParent"
        :get-child-payload="getChildPayload"
        @drop="onDrop"
        @drop-ready="onDropReady"
        @drop-not-allowed="dropNotAllowed"
      >
        <draggable
          v-for="(item, idx) in items"
          :drag-class="'dragging'"
          :key="(item.id, idx)"
        >
          <note-card
            :id="item[0]"
            :content="item"
            :newlyAdded="linked && idx === 0"
            @deleteItem="deleteItem"
          ></note-card>
        </draggable>
      </container>
    </div>
  </div>
</template>

<script>
import NoteCard from "./NoteCard";
import { Container, Draggable } from "vue-dndrop";

export default {
  name: "HomePage",

  components: { Container, Draggable, NoteCard },

  data() {
    return {
      noteBody: "",
      items: Array,
      shouldShake: false,
      isSearching: false,
      linked: false
    };
  },

  mounted() {
    this.getItems();
    if ("linked" in this.$route.query) {
      this.linked = true;
      this.addItem(this.$route.query.linked);
      this.$router.push(this.$route.path);
    }
  },

  computed: {
    inputText() {
      if (this.isSearching) {
        return "Search for a note...";
      } else {
        return "Add a note...";
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

    submitNote() {
      this.linked = false;
      this.addItem(this.noteBody);
      this.noteBody = "";
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

    applyDrag(dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;
      if (removedIndex === null && addedIndex === null) return this.items;

      const result = [...this.items];
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }

      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }

      this.items = [...result];
    },

    clear() {
      this.shouldShake = true;
      this.items.forEach(e => localStorage.removeItem(e[0]));
      this.getItems();
      setTimeout(() => {
        this.shouldShake = false;
      }, 1000);
    },

    onDrop(dropResult) {
      this.applyDrag(dropResult);
    },
    getGhostParent() {
      return document.body;
    },
    onDropReady(dropResult) {},
    dropNotAllowed({ payload, container }) {},
    getChildPayload(index) {
      return this.items[index];
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
  width: 80%;
  border-radius: 15px 15px 2px 15px;
}

.rotate-left {
  transform: rotate(360deg);
  transition-duration: 500ms;
}

.rotate-right {
  transform: rotate(90deg);
  transition-duration: 500ms;
}

.note-input:focus {
  border: 2px solid rgb(155, 150, 150);
  outline: none;
}

.dndrop-draggable-wrapper {
  margin-left: auto;
  margin-right: auto;
}

.topButton {
  font-size: 25px;
  margin-right: 7px;
}

.topButton:hover {
  cursor: pointer;
}

.topButtons {
  margin-left: auto;
}

.title {
  display: flex;
  font-size: 40px;
  margin-top: 40px;
  margin-bottom: 30px;
}

.controls {
  margin-bottom: 40px;
  display: flex;
}

.content {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  padding-right: 70px;
  width: 40em;
}
</style>
