/*
 * @Author      : Mr.bin
 * @Date        : 2024-11-04 11:33:29
 * @LastEditTime: 2024-11-04 11:33:36
 * @Description : 封装axios
 */
import axios from 'axios'

const instance = axios.create({
  baseURL: '', // 局域网
  timeout: 8000
})

export { instance }
