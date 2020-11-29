<template>

</template>

<script>
const md5 = require('md5');
export default {
  name: "websocket",
  props:[],
  data(){
    return {hashList:new Set()};
  },
  created(){

    let u = document.getElementsByClassName('dg ac')[0]//.getElementsByTagName('ul')[0];
    //let lis = u.getElementsByTagName('li');
    console.log(u);

    /*this.connection = new WebSocket("ws://josalhor.ddns.net:7987/ws/chat/example/")
    let x = this;

    this.connection.onmessage = function (event) {
      let jsonData = JSON.parse(event.data);
      const hashmap = md5(JSON.stringify(jsonData));
      if (!x.hashList.has(hashmap)){
        //Change the changes
      }
    }

    this.connection.onopen = function (event) {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
    }*/
  },
  methods: {
    sendChange() {
      let msg = JSON.stringify(this.getChanges());
      this.hashList.add(md5(msg));
      this.connection.send(msg);
    },
    getChanges() {
      return {
        message: {
          //Obj
        }
      };
    }
  },
}
</script>
