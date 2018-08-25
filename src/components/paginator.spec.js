import { shallowMount } from '@vue/test-utils'
import Paginator from './paginator.vue'

describe('Paginator', () =>  {
  it('is defined', () =>  {
    expect(typeof(Paginator)).toBe('object')
  })

  it('sets the correct default data', () => {
    expect(typeof Paginator.data).toBe('function')
    const defaultData = Paginator.data()
    expect(defaultData.chunkSize).toBe(10)
  })

  it('has the correct props', () => {
    const wrapper = shallowMount(Paginator)
    expect(wrapper.props()).toEqual(jasmine.objectContaining({
      total: undefined,
      current: undefined
    }));
  })

  it('renders a nav', () => {
    const wrapper = shallowMount(Paginator)
    expect(wrapper.contains('nav')).toBe(true)
  })
})
