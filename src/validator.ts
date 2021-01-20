import { defineProps } from "vue";

export function allString(props: Array<unknown>) {
    return props.every(e => typeof e === 'string')
} 