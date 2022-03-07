<template>
    <vue-scene
      :keyframes="keyframes"
      easing="ease-in-out"
      fillMode="forwards"
      direction="normal"
      :iterationCount="1"
      :playSpeed="1"
      :time="0"
      :css="false"
      :autoplay="false"
      :ready="true"
      @play="onPlay"
      @paused="onPaused"
      @ended="onEnded"
      @animate="onAnimate"
      @timeupdate="onTimeUpdate"
      @iteration="onIteration"
    >
      <div className="circles">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
      </div>
    </vue-scene>
  </template>
  <script>
    import { VueScene, VueSceneItem } from "vue-scenejs";
  
    export default {
      name: "App",
      components: {
        VueScene,
        VueSceneItem,
      },
      data: function () {
        return {
          keyframes: {
            ".circles .circle": i => ({
              0: {
                "border-width": "150px",
                "opacity": 1,
                "transform": "translate(-50%, -50%) scale(0)",
              },
              1.5: {
                "border-width": "0px",
                "opacity": 0.3,
                "transform": "scale(0.7)",
              },
              options: {
                delay: i * 0.4,
              },
            }),
          },
        };
      },
    };
  </script>