<template>
  <a-modal
      v-model:visible="visible"
      :title="title"
      :mask-closable="false"
      :esc-to-close="false"
      :modal-style="{ maxWidth: '520px' }"
      width="90%"
      @before-ok="save"
      @close="reset"
  >
    <a-form :model="form" :auto-label-width="true" layout="horizontal">
      <a-space direction="vertical" :style="{ width: '300px' }" style="margin: 0 auto">
        <a-form-item field="number" :style="{ width: '300px' }" label="项目编号">
          <a-input v-model="form.number" placeholder="请输入项目编号" />
        </a-form-item>
        <a-form-item field="name" :style="{ width: '300px' }" label="项目名称">
          <a-input v-model="form.name" placeholder="请输入项目名称" />
        </a-form-item>
        <a-form-item field="name" :style="{ width: '300px' }" label="项目介绍">
          <a-textarea v-model="form.introduction" placeholder="请输入项目介绍" max-length="64"/>
        </a-form-item>
        <a-form-item field="type" :style="{ width: '300px' }" label="项目类型">
          <a-select v-model="form.type" placeholder="请选择项目类型">
            <a-option :value="'0'">个人</a-option>
            <a-option :value="'1'">团队</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="gtype" :style="{ width: '300px' }" label="性别">
          <a-select v-model="form.gtype" placeholder="请选择性别">
            <a-option :value="'1'">男</a-option>
            <a-option :value="'2'">女</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="upnum" :style="{ width: '300px' }" label="参加人数">
          <a-input v-model="form.upnum" placeholder="请输入参加人数">
          </a-input>
        </a-form-item>
        <a-form-item field="renum" :style="{ width: '300px' }" label="裁判人数">
          <a-input v-model="form.renum" placeholder="请输入裁判人数">
          </a-input>
        </a-form-item>
      </a-space>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import {Message} from '@arco-design/web-vue'
import {getProject, addProject, updateProject} from '@/apis'
import {useForm} from '@/hooks'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const dataId = ref('')
const isUpdate = computed(() => !!dataId.value)
const title = computed(() => (isUpdate.value ? '修改比赛项目 ' : '新增比赛项目 '))

const {form, resetForm} = useForm({
  number: '',
  name: '',
  introduction: '',
  gtype: '',
  type: '',
  upnum: '',
  renum: ''
  // todo 待补充
})

// 重置
const reset = () => {
  resetForm()
}

const visible = ref(false)
// 新增
const onAdd = () => {
  reset()
  dataId.value = ''
  visible.value = true
}

// 修改
const onUpdate = async (id: string) => {
  reset()
  dataId.value = id
  const res = await getProject(id)
  Object.assign(form, res.data)
  visible.value = true
}

// 保存
const save = async () => {
  try {
    // const isInvalid = await formRef.value?.formRef?.validate()
    // if (isInvalid) return false
    if (isUpdate.value) {
      await updateProject(form, dataId.value)
      Message.success('修改成功')
    } else {
      await addProject(form)
      Message.success('新增成功')
    }
    emit('save-success')
    return true
  } catch (error) {
    return false
  }
}

defineExpose({onAdd, onUpdate})
</script>
