<template>
  <div>
    <el-button type="info" @click="exithome">退出</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    exithome() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
  },
}
</script>
