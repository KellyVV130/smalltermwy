<template>
  <div>
    <editor-bar
      v-model="detail"
      :isClear="isClear"
      @change="change"
    ></editor-bar>

    <button @click="send">点我！</button>
  </div>
</template>
<script>
import EditorBar from "../components/public/editor";

export default {
  components: { EditorBar },
  data() {
    return {
      isClear: false,
      detail: ""
    };
  },
  methods: {
    change(val) {
      console.log(val);
    },
    send() {
      alert(this.detail);
    }
  }
};
</script>

<style>
  .basic{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: whitesmoke;
  }
</style>