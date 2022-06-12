<template>
  <div class="note-card-root">
    <div
      class="note-card"
      :class="{
        'not-last-card': !isLastish,
        'nc-bl': !isLastish && numCols === 1,
        'note-card-lg': true,
      }"
      :id="content[0]"
    >
      <div v-if="!isLastish && numCols === 1" v-html="dateSinceCss"></div>
      <div class="card-container item-background">
        <div class="card-header" :class="{ 'border-bottom': showContent }">
          <div class="card-button">
            <font-awesome-icon
              class="show-arrow collapse"
              @click="collapse"
              :icon="!showContent ? 'caret-right' : 'caret-down'"
              size="xl"
              color="#b1b4ba"
            />
          </div>
          <div class="card-info">
            <span class="card-header-text">
              {{ timeSince(content[0]) + (!showContent ? "," : "") }}
            </span>
            <span class="preview card-content-text" v-if="!showContent">
              {{ preview }}
            </span>
          </div>
          <div class="card-buttons">
            <div @click="copyToClipboard()">
              <font-awesome-icon
                class="card-button"
                v-tooltip="'Copy to clipboard'"
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
        <div class="card-content" v-if="showContent">
          <span class="starter">></span>
          <div class="card-content-text">{{ content[1] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["content", "isLast", "isSecondLast", "isThirdLast", "numCols"],

  data() {
    return {
      showContent: true,
    };
  },

  created() {
    this.$parent.$on("hideOrShowAll", this.hideOrShow);
  },

  methods: {
    hideOrShow(show) {
      this.showContent = show;
    },

    collapse() {
      this.showContent = !this.showContent;
    },

    clone() {
      this.$emit("addItem", this.content[1]);
      this.notify("Note cloned.");
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
    isLastish() {
      let isLatish = this.isLast;
      if (this.numCols >= 2) isLatish = isLatish || this.isSecondLast;
      if (this.numCols >= 3) isLatish = isLatish || this.isThirdLast;
      return isLatish;
    },

    preview() {
      return " " + this.content[1].substring(0, 20) + "...";
    },

    dateSinceCss() {
      return `<style>
      .note-card-root::before{
        color: #d9dce2;
        display: inline-block;
        font-size: 17px;
        float: left;
        margin-left: 0.5px;
        margin-top: -10px;
        letter-spacing: 4px;
        height: 10px;
        content: "-------------";
      }</style>`;
    },
  },
};
</script>

<style>
.note-card-lg {
  padding-left: 2%;
}

.note-card {
  border-radius: 0px;
}

.nc-bl {
  border-left: 2px dashed #bec2bb79;
}

.starter {
  user-select: none;
  color: #b1b4ba;
  margin-right: 6px;
  font-size: 12px;
}

.topButton {
  outline: none;
}

.card-button {
  cursor: pointer;
  outline: none;
}

.card-header {
  display: flex;
  margin-left: 10px;
}

.card-button {
  justify-content: center;
  margin-right: 8px;
}

.card-buttons {
  padding-bottom: 3px;
  display: flex;
  margin-left: auto;
  font-size: 16px;
}

.card-button:hover {
  transform: scale(1.15);
}

.not-last-card {
  padding-bottom: 10px;
}

.border-bottom {
  border-bottom: 1px solid #bec2bb42;
}

.preview {
  margin-right: auto;
}

.preview.card-header-text {
  font-size: 12px;
  font-family: Helvetica;
  color: rgba(43, 43, 42, 0.831);
}

.card-header-text {
  user-select: none;
  font-size: 12px;
  font-family: Helvetica;
  color: rgba(1, 2, 0, 0.201);
}

.card-info {
  word-break: break-all;
  margin-right: auto;
  padding-right: 10px;
  padding-left: 4px;
}

.card-content-text {
  font-weight: 500;
  letter-spacing: 0.3px;
  font-size: 16px;
  color: rgb(3, 3, 3);
  font-family: Arial;
}

html .card-content {
  line-height: 23px;
  display: flex;
  margin-top: 5px;
  padding-right: 5px;
  padding-bottom: 0px;
  padding-left: 8px;
  padding-top: 10px;
  word-break: break-all;
  text-align: left;
  overflow: hidden;
  white-space: pre-wrap;
}

.item-background {
  background-color: rgba(255, 255, 255, 0.374) !important;
}

.newly-added-bg {
  background-color: rgba(19, 19, 19, 0.374);
}

.collapse {
  min-width: 15px;
  margin-bottom: -5 px;
}

.card-container {
  border-radius: 0px 12px 12px 12px;
  padding-top: 12px;
  padding-right: 10px;
  padding-bottom: 10px;
  border: 2px solid #d9dce2;
  transition: background-color 2000ms ease-out;
  box-shadow: 0 0px 0px rgba(255, 254, 254, 0.3),
    0 10px 30px 8px rgba(186, 184, 184, 0.3);
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
