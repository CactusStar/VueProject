<template>
    <canvas class="canvas" ref="canvasRef"/>
</template>
      
<script>
    export default {
        name: "Canvas",
        props: {
            globalCompositeOperation: String
        },
        methods: {
            initCanvas: function() {
            const canvas = this.$refs.canvasRef;
            const width = window.innerWidth;
            const height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            if (this.globalCompositeOperation) {
                const context = canvas.getContext("2d");
                context.globalCompositeOperation = this.globalCompositeOperation;
            }

            this.$emit("canvasInited", canvas);
            },
            resize: function() {
            const canvas = this.$refs.canvasRef;
            const width = window.innerWidth;
            const height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            this.$emit("canvasResize", { width, height });
            },

            handleMouseDown: function(e) {
            this.$emit("canvasMouseDown", e);
            },

            handleMouseMove: function(e) {
            this.$emit("canvasMouseMove", e);
            },

            handleMouseUp: function(e) {
            this.$emit("canvasMouseUp", e);
            }
        },
        mounted() {
            this.initCanvas();
            this.resize = this.resize.bind(this);
            window.addEventListener("resize", this.resize);
        },
        beforeDestory() {
            window.removeEventListener("resize", this.resize);
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import './CSS/canvas.css';
</style>
      