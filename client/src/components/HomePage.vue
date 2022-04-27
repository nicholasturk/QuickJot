<template>
  <div class="simple-page">
    <div class="content">
      <div class="controls">
        <input type="text" v-model="noteBody" @keyup.enter="submitNote()" />
        <div @click="clear()">
          clear
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
          v-for="item in items"
          :drag-class="'dragging'"
          :key="item.id"
        >
          <note-card :content="item" @deleteItem="deleteItem"></note-card>
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
      items: Array
    };
  },

  mounted() {
    this.getItems();
    if ("linked" in this.$route.query) {
      this.addItem(this.$route.query.linked);
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
      this.addItem(this.noteBody);
      this.noteBody = "";
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
      this.items.forEach(e => localStorage.removeItem(e[0]));
      this.getItems();
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
.controls {
  margin-bottom: 20px;
}

.dndrop-draggable-wrapper {
  margin-left: auto;
  margin-right: auto;
}

.content {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  width: 35em;
}
</style>
