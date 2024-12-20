<!--
 * @Author      : Mr.bin
 * @Date        : 2024-02-07 14:19:10
 * @LastEditTime: 2024-12-20 15:15:41
 * @Description : 根组件
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',

  created() {
    this.initLocalStorage()
    this.initSessionStorage()
  },

  methods: {
    /**
     * @description: 软件启动后，初始化localStorage的一些值
     */
    initLocalStorage() {
      /* 初始化API的IP地址 */
      if (!window.localStorage.getItem('ip')) {
        window.localStorage.setItem('ip', '192.168.1.100')
      }

      /* 初始化传感器K1~K4 */
      const sensor_k = [
        {
          gg: '15',
          k1: 0,
          k2: 0,
          k3: 0,
          k4: 0
        },
        {
          gg: '20',
          k1: 0,
          k2: 0,
          k3: 0,
          k4: 0
        },
        {
          gg: '25',
          k1: 0,
          k2: 0,
          k3: 0,
          k4: 0
        },
        {
          gg: '30',
          k1: 0,
          k2: 0,
          k3: 0,
          k4: 0
        }
      ]
      if (!window.localStorage.getItem('sensor_k')) {
        window.localStorage.setItem('sensor_k', JSON.stringify(sensor_k))
      }
    },

    /**
     * @description: 软件启动后，初始化sessionStorage的一些值
     */
    initSessionStorage() {
      /* 初始化标定值 */
      if (!window.sessionStorage.getItem('standard_slider_value')) {
        window.sessionStorage.setItem(
          'standard_slider_value',
          JSON.stringify([])
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
