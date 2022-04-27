<template>
  <div id="note-card">
    <div class="card-container">
      <div class="card-buttons">
        <div class="card-button" @click="generateLink()">
          <font-awesome-icon icon="link" color="#b1b4ba" />
        </div>
        <div class="card-button" @click="copyToClipboard()">
          <font-awesome-icon icon="copy" color="#b1b4ba" />
        </div>
        <div class="card-button" @click="$emit('deleteItem', content[0])">
          <font-awesome-icon icon="trash-can" color="#b1b4ba" />
        </div>
      </div>
      <div class="card-content">
        {{ content[1] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["content"],
  methods: {
    async generateLink() {
      let queryParam = `linked=${this.content[1]}`;
      let url = `${location.protocol}//${location.host}${location.pathname}?${queryParam}`;
      await navigator.clipboard.writeText(url);
      this.notify("Link copied to clipboard.");
    },
    async copyToClipboard() {
      await navigator.clipboard.writeText(this.content[1]);
      this.notify("Note copied to clipboard.");
    },
    notify(message) {
      this.$notify({
        message,
        type: "",
        top: true,
        bottom: false,
        left: true,
        right: false,
        showClose: false,
        closeDelay: 1500
      });
    }
  }
};
</script>

<style>
.card-buttons {
  padding-right: 10px;
  display: flex;
  justify-content: flex-end;
}

.card-button {
  margin-left: 8px;
}

.card-button:hover {
  transform: scale(1.15);
}

.card-content {
  word-wrap: break-word;
  text-align: center;
}

.card-container {
  padding: 15px;
  border: 2px solid #b1b4ba;
  margin-bottom: 40px;
  cursor: pointer;
}
</style>
