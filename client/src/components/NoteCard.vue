<template>
  <div id="note-card">
    <div class="card-container">
      <div class="card-header">
        <div class="created-date">
          {{ timeSince(content[0]) }}
        </div>
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
      </div>
      <div class="card-content">
        <span class="starter">></span>
        <div>{{ content[1] }}</div>
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
    timeSince(date) {
      var seconds = Math.floor((new Date() - date) / 1000);

      var interval = seconds / 31536000;
      var ret = "";

      if (interval >= 1) {
        ret = Math.floor(interval) + " year";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        ret = Math.floor(interval) + " month";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        ret = Math.floor(interval) + " day";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        ret = Math.floor(interval) + " hour";
      }
      interval = seconds / 60;
      if (interval > 1) {
        ret = Math.floor(interval) + " minute";
      }
      ret = Math.floor(seconds) + " second";
      ret += "s ago";
      if (ret === "0 seconds ago") return "just now";
      return ret;
    },

    async generateLink() {
      let queryParam = `linknote=${this.content[1]}`;
      let url = `${location.protocol}//${location.host}${location.pathname}?${queryParam}`;
      await navigator.clipboard.writeText(url);
      this.notify("Shareable note link copied to clipboard.");
    },
    async copyToClipboard() {
      await navigator.clipboard.writeText(this.content[1]);
      this.notify("Note content copied to clipboard.");
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
    }
  }
};
</script>

<style>
.card-header {
  padding-right: 9px;
  padding-bottom: 5px;
  display: flex;
}

.starter {
  user-select: none;
  color: #b1b4ba;
  margin-right: 5px;
  font-size: 20px;
}

.card-header {
  display: flex;
}

.card-button {
  justify-content: center;
  margin-right: 8px;
}

.card-buttons {
  padding-bottom: 3px;
  display: flex;
  cursor: pointer;
  font-size: 16px;
}

.card-button:hover {
  transform: scale(1.15);
}

.created-date {
  margin-right: auto;
  font-size: 12px;
  color: rgb(9, 120, 9);
}

.card-content {
  display: flex;
  margin-top: 5px;
  font-size: 17px;
  word-break: break-all;
  text-align: left;
  overflow: hidden;
  white-space: pre-wrap;
}

.newly-added {
  background-color: #bec2bb;
}

.card-container {
  border-radius: 22px 22px 22px 4px;
  min-height: 65px;
  padding: 16px;
  border: 2px solid #b1b4ba;
  transition: background-color 4000ms ease-out;
  margin-bottom: 40px;
  box-shadow: 0 19px 50px rgba(230, 223, 223, 0.3),
    0 12px 12px rgba(133, 129, 129, 0.3);
}
</style>
