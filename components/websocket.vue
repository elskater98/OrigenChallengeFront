<template>

</template>

<script>
const md5 = require('md5');
export default {
  name: "websocket",
  props:[],
  data(){
    return {
      hashList:new Set(),
      inputs:null,
      get_info:null
      };
  },
  created(){

    this.connection = new WebSocket("wss://josalhor.ddns.net:7987/ws/chat/example/")
    let x = this;

    this.connection.onmessage = function (event) {
      let jsonData = JSON.parse(event.data);
      const hashmap = md5(JSON.stringify(jsonData));
      if (x.inputs == null){
        return;
      }
      console.log('rec!', jsonData);
      if (x.hashList != hashmap){
        x.hashList = hashmap;
        let arr = jsonData.message;
        console.log(arr);
        for (let i = 0; i < arr.length; i++){
          let tmp = x.inputs[i].onchange;
          x.inputs[i].onchange = null;
          if (x.inputs[i].type == 'checkbox'){
            if (x.inputs[i].checked != arr[i]){
              x.inputs[i].dispatchEvent(
                new MouseEvent('click', {
                  'view': window,
                  'bubbles': true,
                  'cancelable': true
                })
              );
              x.inputs[i].checked = arr[i];
            }
            x.inputs[i].onchange = tmp;
          } else {
            if (x.inputs[i].value != arr[i]){
                x.inputs[i].value = arr[i];
                x.inputs[i].dispatchEvent(
                  new Event('mousemove ', {
                    percent: x.inputs[i].value
                  })
                );
              }
            }
        }
        //Change the changes
      }
    }

    this.connection.onopen = function (event) {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
    }

    setTimeout(function() {
    
    /* methods */
    function getByType(on, tp){
      var inputs = on.getElementsByTagName('input');
      for(var i = 0; i < inputs.length; i++) {
          if(inputs[i].type.toLowerCase() == tp) {
              let c = inputs[i].value;
              if (tp == 'checkbox'){
                c = inputs[i].checked;
              }
              return [inputs[i], c];
          }
      }
      return null;
    }

    function parse_item(item){
      let cl = item.className;
      if (cl.includes('boolean')){
        console.log('checkbox', getByType(item, 'checkbox'));
        return getByType(item, 'checkbox');
      } else if (cl.includes('number')){
        let c = item.getElementsByClassName('slider-fg')[0];
        let c2 = getByType(item, 'text');
        if (c2 != null){
          c.onmouseup = function (e) { x.sendChange(e); };
          c.ondrag = function (e) { x.sendChange(e); };
          return [c, c.style.width];
        }
      }
      //} else if (cl.includes('string')){
      let xz = item.getElementsByTagName('select')[0];
      return [xz, xz.value];
      //}
    }

    function generateArr(){
      let u = document.getElementsByClassName('dg ac')[0].getElementsByTagName('ul')[0];
      let lis = u.getElementsByTagName('li');

      let crs = [];
      let items = [];

      for (let i = 0; i < lis.length; i++){
        let item = lis[i];
        let cl = item.className;
        if (cl.includes('cr')){
          let parsed = parse_item(item);
          items.push(parsed[0]);
          crs.push(parsed[1]);
        }
      }
      return [items, crs];
    }
    x.get_info = generateArr;
    let y = generateArr();
    x.inputs = y[0];

    for(let i = 0; i < x.inputs.length; i++){
      x.inputs[i].onchange = function (e) { x.sendChange(e); }  
    }
    console.log(y[1]);
    }, 2000);
  },
  methods: {
    sendChange() {
      let msg = JSON.stringify(this.getChanges());
      console.log('Log', msg);
      this.hashList = md5(msg);
      this.connection.send(msg);
    },
    getChanges() {
      return {
        message: this.get_info()[1]
      };
    }
  },
}
</script>
