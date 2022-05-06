<template>
  <div class="note-card-root">
    <div
      class="note-card"
      :class="{ 'not-last-card': !isLast, 'nc-bl': !isLast }"
      :id="content[0]"
    >
      <div v-if="!isLast" v-html="dateSinceCss"></div>
      <div class="card-container">
        <div class="card-header">
          <div class="created-date">
            {{ timeSince(content[0]) }}
          </div>
          <div class="card-buttons">
            <div @click="copyToClipboard()">
              <font-awesome-icon
                class="card-button"
                v-tooltip="'Copy content'"
                icon="clipboard"
                size="lg"
                color="#b1b4ba"
              />
            </div>
            <div @click="generateLink()">
              <font-awesome-icon
                class="card-button"
                v-tooltip="'Copy shareable link'"
                icon="link"
                size="lg"
                color="#b1b4ba"
              />
            </div>
            <div @click="clone()">
              <font-awesome-icon
                class="card-button"
                v-tooltip="'Clone'"
                icon="clone"
                size="lg"
                color="#b1b4ba"
              />
            </div>
            <div @click="$emit('deleteItem', content[0])">
              <font-awesome-icon
                class="card-button"
                v-tooltip="'Delete note'"
                icon="trash-can"
                size="lg"
                color="#b1b4ba"
              />
            </div>
          </div>
        </div>
        <div class="card-content">
          <span class="starter">></span>
          <div class="card-content-text">{{ content[1] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["content", "newlyAdded", "isLast"],

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
    clone() {
      this.$emit("addItem", this.content[1]);
    },

    timeSince(date) {
      var seconds = Math.floor((new Date() - date) / 1000);
      if (seconds === 0) {
        return "just now";
      }

      var interval = seconds / 31536000;
      var timeCode = "";

      if (interval >= 1) {
        timeCode = "year";
      } else {
        interval = seconds / 2592000;
        if (interval >= 1) {
          timeCode = "month";
        } else {
          interval = seconds / 86400;
          if (interval >= 1) {
            timeCode = "day";
          } else {
            interval = seconds / 3600;
            if (interval >= 1) {
              timeCode = "hour";
            } else {
              interval = seconds / 60;
              if (interval >= 1) {
                timeCode = "minute";
              } else {
                timeCode = "second";
              }
            }
          }
        }
      }

      let numTimes = timeCode !== "second" ? Math.floor(interval) : seconds;
      return `${numTimes} ${timeCode}${numTimes > 1 ? "s" : ""} ago`;
    },

    async generateLink() {
      let queryParam = `linknote=${encodeURIComponent(this.content[1])}`;
      let url = `${location.protocol}//${location.host}${location.pathname}?${queryParam}`;
      if (url.length > 2048) {
        this.notify(
          "Error: Note too large to share. Must be under 2000 characters."
        );
      } else {
        await navigator.clipboard.writeText(url);
        this.notify("Shareable collection link copied to clipboard.");
      }
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
        closeDelay: 3000,
      });
    },
  },

  computed: {
    dateSinceCss() {
      return `<style>      
      .note-card-root::before{
        color: #d9dce2;
        display: inline-block;
        font-size: 17px;
        float: left;
        margin-top: -10px;
        letter-spacing: -1.7px;
        content: "-------------"
      }</style>`;
    },
  },
};
</script>

<style>
.note-card {
  padding-left: 47px;
  border-radius: 0px;
}

.nc-bl{
  border-left: 2px solid #bec2bb79;
}

.card-header {
  border-bottom: 1px solid #bec2bb42;
  margin-bottom: 10px;
  padding-bottom: 3px;
  display: flex;
}

.starter {
  user-select: none;
  color: #b1b4ba;
  margin-right: 6px;
  font-size: 17px;
}

.topButton {
  outline: none;
}

.card-button {
  outline: none;
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
  margin-left: auto;
  cursor: pointer;
  font-size: 16px;
}

.card-button:hover {
  transform: scale(1.15);
}

.not-last-card {
  padding-bottom: 55px;
}

.created-date {
  margin-right: auto;
  padding-top: 5px;
  margin-top: 5px;
  font-size: 12px;
  font-family: Helvetica;
  padding-left: 4px;
  color: rgba(1, 2, 0, 0.156);
}

.card-content-text {
  color: rgba(0, 0, 0, 0.83);
  font-family: Helvetica;
}

html .card-content {
  line-height: 23px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  display: flex;
  margin-top: 5px;
  padding: 25px;
  padding-left: 5px;
  padding-top: 10px;
  word-break: break-all;
  text-align: left;
  overflow: hidden;
  white-space: pre-wrap;
}

.newly-added {
  background-color: #bec2bb;
}

.card-container {
  border-radius: 0px 22px 22px 6px;
  min-height: 85px;
  background-color: rgba(255, 255, 255, 0.724);
  padding: 16px;
  border: 2px solid #d9dce2;
  /* transition: background-color 4000ms ease-out; */
  box-shadow: 0 0px 0px rgba(255, 254, 254, 0.3),
    0 8px 8px rgba(186, 184, 184, 0.3);
}

/* Custom, iPhone Retina */
@media only screen and (max-width: 320px) {
}

/* Extra Small Devices, Phones */
@media only screen and (max-width: 560px) {
  .note-card {
    padding-right: 15px;
  }
}

/* Small Devices, Tablets */
@media only screen and (max-width: 768px) {
}

/* Medium Devices, Desktops */
@media only screen and (max-width: 992px) {
}

/* Large Devices, Wide Screens */
@media only screen and (min-width: 1200px) {
}
</style>
