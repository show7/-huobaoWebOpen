export default {
  components: {
    Balls: () => import('@/components/Balls.vue')
  },
  props: {
    data: {
      type: Array,
      required: false,
      default: () => []
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    selects: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  computed: {
    code () {
      return this.$route.params.code || ''
    }
  }
}
