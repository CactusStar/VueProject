<template>
    <Canvas
        global-composite-operation="source-over"
        v-on:canvasInited="canvasInited"
        v-on:canvasResize="canvasResize"
        v-on:canvasMouseDown="canvasMouseDown"
        v-on:canvasMouseMove="canvasMouseMove"
        v-on:canvasMouseUp="canvasMouseUp"
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
        canvasMouseDown: function(e) {
        this.emitter.emit();
        },
        canvasMouseMove: function(e) {
        if (e.layerX || e.layerX === 0) {
            this.emitter.p.x = e.layerX;
            this.emitter.p.y = e.layerY;
        } else if (e.offsetX || e.offsetX === 0) {
            this.emitter.p.x = e.offsetX;
            this.emitter.p.y = e.offsetY;
        }
        },
        canvasMouseUp: function(e) {
        this.emitter.stop();
        },

        createProton(canvas) {
        const proton = new Proton();
        const emitter = new Proton.Emitter();
        emitter.rate = new Proton.Rate(new Proton.Span(1, 2), 0.012);

        emitter.addInitialize(new Proton.Mass(1));
        emitter.addInitialize(new Proton.Radius(2, 20));
        emitter.addInitialize(new Proton.Life(10, 13));
        emitter.addInitialize(
            new Proton.Velocity(new Proton.Span(1, 2), [100, 135, 225, 315], "polar")
        );

        emitter.addBehaviour(new Proton.Collision(emitter));
        emitter.addBehaviour(new Proton.Color("#dddddd"));
        emitter.addBehaviour(
            new Proton.CrossZone(
            new Proton.RectZone(0, 0, canvas.width, canvas.height),
            "bound"
            )
        );

        emitter.damping = 0.02;
        proton.addEmitter(emitter);

        const context = canvas.getContext("2d");
        const renderer = new Proton.CanvasRenderer(canvas);
        renderer.onProtonUpdate = () => {
            context.fillStyle = "rgba(0, 0, 0, 0.09)";
            context.fillRect(0, 0, canvas.width, canvas.height);
        };

        proton.addRenderer(renderer);

        this.proton = proton;
        this.emitter = emitter;
        },
        renderProton: function() {
        if (this.proton) {
            this.proton.update();
            this.proton.stats.update(1);
        }
        }
    },
    created() {
        RAFManager.add(this.renderProton);
    },
    beforeDestory() {
        try {
        this.proton.destroy();
        RAFManager.remove(this.renderProton);
        } catch (e) {}
    }
    };
</script>
    