<!--
 * @Author      : Mr.bin
 * @Date        : 2024-02-07 14:19:10
 * @LastEditTime: 2024-12-23 11:09:18
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
          gg: '15', // 规格
          k1: 0.0036, // 应变片
          k2: 100, // 2号压力传感器
          k3: 100, // 3号压力传感器
          k4: 100 // 4号压力传感器
        },
        {
          gg: '20',
          k1: 0.001,
          k2: 100,
          k3: 100,
          k4: 100
        },
        {
          gg: '25',
          k1: 0.001,
          k2: 100,
          k3: 100,
          k4: 100
        },
        {
          gg: '30',
          k1: 0.001,
          k2: 100,
          k3: 100,
          k4: 100
        }
      ]
      if (!window.localStorage.getItem('sensor_k')) {
        window.localStorage.setItem('sensor_k', JSON.stringify(sensor_k))
      }

      /* 初始化3个常数项：等高常数、到A常数、到B常数 */
      const cs = [
        {
          gg: '15', // 规格
          xh: 'AA', // 型号
          gx: '15AA', // 规格型号
          QRCode: 'S2025970', // 标准滑块二维码号
          dgCS: 3, // 等高常数
          toACS: -11, // 到A常数
          toBCS: -8 // 到B常数
        },
        {
          gg: '15',
          xh: 'AN',
          gx: '15AN',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0
        },
        {
          gg: '15',
          xh: 'DA',
          gx: '15DA',
          QRCode: 'S2025970',
          dgCS: 3,
          toACS: -11,
          toBCS: -8
        },
        {
          gg: '20',
          xh: 'AA',
          gx: '20AA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0
        },
        {
          gg: '20',
          xh: 'EA',
          gx: '20EA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0
        },
        {
          gg: '20',
          xh: 'HAA',
          gx: '20HAA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0
        },
        {
          gg: '20',
          xh: 'HEA',
          gx: '20HEA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0
        },
        {
          gg: '25',
          xh: 'AA',
          gx: '25AA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0
        },
        {
          gg: '25',
          xh: 'EA',
          gx: '25EA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0
        },
        {
          gg: '25',
          xh: 'AN',
          gx: '25AN',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0
        },
        {
          gg: '25',
          xh: 'HAA',
          gx: '25HAA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0
        },
        {
          gg: '25',
          xh: 'HEA',
          gx: '25HEA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0
        },
        {
          gg: '25',
          xh: 'HAN',
          gx: '25HAN',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0
        },
        {
          gg: '30',
          xh: 'AA',
          gx: '30AA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0
        },
        {
          gg: '30',
          xh: 'EA',
          gx: '30EA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0
        },
        {
          gg: '30',
          xh: 'AN',
          gx: '30AN',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0
        },
        {
          gg: '30',
          xh: 'HAA',
          gx: '30HAA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0
        },
        {
          gg: '30',
          xh: 'HEA',
          gx: '30HEA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0
        },
        {
          gg: '30',
          xh: 'HAN',
          gx: '30HAN',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0
        }
      ]
      if (!window.localStorage.getItem('cs')) {
        window.localStorage.setItem('cs', JSON.stringify(cs))
      }

      /* 初始化中心距评定的上下限 */
      const centerSpacing_min_max = [
        {
          gx: '15',
          centerSpacing_min: 0,
          centerSpacing_max: 1
        },
        {
          gx: '20', // 非加长
          centerSpacing_min: 0,
          centerSpacing_max: 0
        },
        {
          gx: '20H', // 加长
          centerSpacing_min: 0,
          centerSpacing_max: 0
        },
        {
          gx: '25',
          centerSpacing_min: 0,
          centerSpacing_max: 0
        },
        {
          gx: '25H',
          centerSpacing_min: 0,
          centerSpacing_max: 0
        },
        {
          gx: '30',
          centerSpacing_min: 0,
          centerSpacing_max: 0
        },
        {
          gx: '30H',
          centerSpacing_min: 0,
          centerSpacing_max: 0
        }
      ]
      if (!window.localStorage.getItem('centerSpacing_min_max')) {
        window.localStorage.setItem(
          'centerSpacing_min_max',
          JSON.stringify(centerSpacing_min_max)
        )
      }
    },

    /**
     * @description: 软件启动后，初始化sessionStorage的一些值
     */
    initSessionStorage() {
      /* 初始化标准滑块的标定值 */
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
