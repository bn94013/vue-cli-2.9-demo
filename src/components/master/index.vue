<template>
  <div class="backjpg">
    <indexheader></indexheader>
    <indexmain></indexmain>

  </div>
</template>



<style>
.backjpg {
  width: 100%;
  background: url(images/bac01.jpg) no-repeat;
  background-size: cover;
}
</style>



<script>
import $ from "jquery";
import indexheader from "./indexheader";
import indexmain from "./indexmain";

export default {
  components: {
    indexheader,
    indexmain,
  },
};
</script>