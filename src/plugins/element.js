import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'


Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
//挂载为vue中的组件,之后每个组件中可以使用this.$message
Vue.prototype.$message = Message