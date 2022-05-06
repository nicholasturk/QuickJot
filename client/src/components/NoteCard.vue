<template>
  <div class="note-card-root">
    <div class="note-card" :class="{ 'not-last-card': !isLast }" :id="content[0]">
      <div v-html="dateSinceCss"></div>
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
      let queryParam = `linknote=${this.content[1]}`;
      let url = `${location.protocol}//${location.host}${location.pathname}?${queryParam}`;
      if(url.length > 2048) {
        this.notify("Error: Note too large to share. Must be under 2000 characters.");
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
        closeDelay: 3000
      });
    }
  },
  
  computed: {
    dateSinceCss(){  
      return `<style>      
      .note-card-root::before{
        color: #aaaca9;
        display: inline-block;
        font-size: 54px;
        float: right;
        margin-right: -9px;
        margin-top: -26px;
        content: "\\2022"
      }</style>`
    },
  }
};
</script>

<style>

.note-card{
  padding-right: 50px;
  border-radius: 0px;
  border-right: 2px dotted #bec2bbad;
}

.card-header {
  border-bottom: 1px solid #bec2bb4f;
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

.not-last-card{
  padding-bottom: 55px;
}

.created-date {
  margin-right: auto;
  padding-top: 5px;
  margin-top: 5px;
  font-size: 10px;
  font-family: Helvetica;
  padding-left: 4px;
  color: rgba(24, 150, 24, 0.345);
}

.card-content-text{
  color: rgba(0, 0, 0, 0.824);
  font-family: Helvetica;
}

html .card-content {
  line-height: 23px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 2px;
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
  border-radius: 22px 22px 22px 6px;
  min-height: 85px;
  background-color: white;
  padding: 16px;
  border: 2px solid #b1b4ba;
  transition: background-color 4000ms ease-out;
  box-shadow: 0 0px 0px rgba(255, 254, 254, 0.3),
    0 8px 8px rgba(186, 184, 184, 0.3);
}


/* Custom, iPhone Retina */ 
@media only screen and (max-width : 320px) {
    
}

    /* Extra Small Devices, Phones */ 
@media only screen and (max-width : 560px) {
  .note-card{
    padding-right: 15px;
  }
}

/* Small Devices, Tablets */
@media only screen and (max-width : 768px) {

}

/* Medium Devices, Desktops */
@media only screen and (max-width : 992px) {

}

/* Large Devices, Wide Screens */
@media only screen and (min-width : 1200px) {

}

</style>
