<template>
    <Canvas
        global-composite-operation="source-over"
        v-on:canvasInited="canvasInited"
        v-on:canvasResize="canvasResize"
    />
</template>
    
<script>
    import Canvas from "./Canvas";
    import Proton from "proton-engine";
    import RAFManager from "raf-manager";

    export default {
    name: "App",
    components: {
        Canvas
    },
    methods: {
      canvasInited: function(canvas) {
        this.createProton(canvas);
        },
        canvasResize: function({ width, height }) {
        this.renderer && this.renderer.resize(width, height);
        },
        // canvasMouseDown: function(e) {
        // this.emitter.emit();
        // },
        // canvasMouseMove: function(e) {
        // if (e.layerX || e.layerX === 0) {
        //     this.emitter.p.x = e.layerX;
        //     this.emitter.p.y = e.layerY;
        // } else if (e.offsetX || e.offsetX === 0) {
        //     this.emitter.p.x = e.offsetX;
        //     this.emitter.p.y = e.offsetY;
        // }
        // },
        // canvasMouseUp: function(e) {
        // this.emitter.stop();
        // },

        createProton: function(canvas) {
        var colors = [
            "#529B88",
            "#CDD180",
            "#FFFA32",
            "#FB6255",
            "#FB4A53",
            "#FF4E50",
            "#F9D423"
        ]
        const proton = new Proton();
        const emitter = new Proton.Emitter();
        emitter.rate = new Proton.Rate(
            new Proton.Span(5, 8),
            new Proton.Span(0.05, 0.2)
        );

        emitter.addInitialize(new Proton.Mass(1));
        emitter.addInitialize(new Proton.Radius(20, 200));
        emitter.addInitialize(new Proton.Life(2, 4));
        emitter.addInitialize(
            new Proton.Position(new Proton.RectZone(0, 0, canvas.width, canvas.height))
        );

        emitter.addBehaviour(new Proton.Alpha(0, 1, Infinity, Proton.easeOutCubic));
        emitter.addBehaviour(new Proton.Scale(1, 0, Infinity, Proton.easeOutCubic));
        emitter.addBehaviour(new Proton.Color(colors, "random"));

        emitter.emit();
        proton.addEmitter(emitter);

        const context = canvas.getContext("2d");
        const renderer = new Proton.CanvasRenderer(canvas);
        renderer.onProtonUpdate = () => {
            context.fillStyle = "rgba(0, 0, 0, 1)";
            context.fillRect(1, 1, canvas.width, canvas.height);
        };

        proton.addRenderer(renderer);

        this.proton = proton;
        this.emitter = emitter;
        },
        renderProton: function() {
        if (this.proton) {
            this.proton.update();
            this.proton.stats.update(2);
         }
        }
    },
    created: function() {
        RAFManager.add(this.renderProton);
    } 
}
</script>