<template>
    <div class="loading-bar-container">
        <svg class="loading-spinner">
            <circle
                    :cx="circlePositions[index] && circlePositions[index].x"
                    :cy="circlePositions[index] && circlePositions[index].y"
                    :r="item.radius"
                    :fill="item.color"
                    v-for="(item, index) in circles"
                    :key="index"
            />
        </svg>
    </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";

const CENTER_X = 50;
const CENTER_Y = 50;
const RADIUS = 20;

function positionOnCircle(radius: number, angle: number, center: any) {
    return {
        x: center.x + radius * Math.cos(toRadians(angle)),
        y: center.y + radius * Math.sin(toRadians(angle)),
    };
}

function toRadians(angle: number) {
    return (angle * Math.PI) / 180;
}

function calculatePositions(component: any) {
    const angleIncrement: number = 360 / component.circles.length;
    const positions: any = {};
    component.circles.forEach((circle: any, index: number) => {
        positions[index] = positionOnCircle(RADIUS, angleIncrement * index, {
            x: CENTER_X,
            y: CENTER_Y,
        });
    });
    return positions;
}

export default defineComponent({
    name: 'Spinner',
    components: {},
    data() {
        return {
            circles: [
                {color: "#420b5e", radius: 0},
                {color: "#5d108a", radius: 0},
                {color: "#9b1ddc", radius: 0},
                {color: "#7d28ad", radius: 0},
                {color: "#4d206b", radius: 0},
                {color: "#7b08b4", radius: 0},
                {color: "#690e9b", radius: 0},
                {color: "#972ed2", radius: 0},
                {color: "#31163b", radius: 0},
            ],
            counter: 0,
            interval: 0,
        };
    },
    computed: {
        circlePositions: calculatePositions,
    },
    created() {
        this.interval = setInterval(() => {
            this.counter++;
            this.circles = this.circles.map((item, index) => ({
                ...item,
                radius: (this.counter + index) % 8,
            }));
        }, 70);
    },
    unmounted() {
        clearInterval(this.interval);
    },
})
</script>
<style scoped>
.loading-spinner {
    width: 100px;
    height: 100px;
    z-index: 1;
}

.loading-bar-container {
    width: 100px;
    height: 100px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
}
</style>