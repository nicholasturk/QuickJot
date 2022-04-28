<template>
  <div id="note-card">
    <div class="card-container">
      <div class="card-buttons">
        <div class="card-button" @click="copyToClipboard()">
          <font-awesome-icon icon="copy" size="lg" color="#b1b4ba" />
        </div>
        <div class="card-button" @click="generateLink()">
          <font-awesome-icon icon="link" size="lg" color="#b1b4ba" />
        </div>
        <div class="card-button" @click="$emit('deleteItem', content[0])">
          <font-awesome-icon icon="trash-can" size="lg" color="#b1b4ba" />
        </div>
      </div>
      <div class="card-content">
        <span class="starter">></span> {{ content[1] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["content", "newlyAdded"],

  mounted() {
    let orig = document.getElementsByClassName("card-container")[0];
    if (this.newlyAdded) {
      orig.classList.add("newly-added");
      setTimeout(() => {
        orig.classList.remove("newly-added");
      }, 0);
    }
  },

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
  padding-right: 9px;
  padding-bottom: 5px;
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid;
  border-image: linear-gradient(to right, transparent 79%, #d0d4da 17%) 100% 2;
}

.starter {
  color: #b1b4ba;
  margin-right: 5px;
  font-size: 20px;
}

.card-button {
  font-size: 20px;
  margin-left: 8px;
}

.card-button:hover {
  transform: scale(1.15);
}

.card-content {
  display: flex;
  margin-top: 5px;
  font-size: 20px;
  word-break: break-all;
  text-align: left;
  overflow: hidden;
}

.newly-added {
  background-color: #dbf9c6;
}

.card-container {
  border-radius: 22px 22px 22px 2px;
  min-height: 100px;
  padding: 16px;
  border: 2px solid #b1b4ba;
  transition: background-color 4000ms ease-out;
  margin-bottom: 40px;
  cursor: pointer;
}

.card-container:hover {
  border: 3px solid #b1b4ba;
  padding: 15px;
}
</style>
