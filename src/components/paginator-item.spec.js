import { shallowMount } from '@vue/test-utils'
import PaginatorItem from './paginator-item.vue'

describe('paginator-item.vue', () =>  {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(PaginatorItem, {
      slots: {
        default: '<some-slot-content></some-slot-content>'
      }
    })
  })

  it('renders a <li>', () => {
    expect(wrapper.is('li')).toBe(true)
  })

  it('is a bootstrap navigator page-item', () => {
    expect(wrapper.classes()).toContain('page-item')
  })

  it('is enabled by default', () => {
    expect(wrapper.classes()).not.toContain('disabled')
  })

  it('it can be enabled via property \'disabled\'', () => {
    wrapper.setProps({disabled: false})
    expect(wrapper.classes()).not.toContain('disabled')
  })

  it('it can be disabled via property \'disabled\'', () => {
    wrapper.setProps({disabled: true})
    expect(wrapper.classes()).toContain('disabled')
  })

  it('it is inactive by default', () => {
    expect(wrapper.classes()).not.toContain('active')
  })

  it('it can be set inactive via property \'active\'', () => {
    wrapper.setProps({active: false})
    expect(wrapper.classes()).not.toContain('active')
  })

  it('it can be set active via property \'active\'', () => {
    wrapper.setProps({active: true})
    expect(wrapper.classes()).toContain('active')
  })

  describe('it contains a link element', () => {
    let a

    beforeEach(() => {
      a = wrapper.find('a')
    })

    it('it has the required bootstrap paginator class \'page-link\'', () => {
      expect(a.classes()).toContain('page-link')
    })

    it('it has a # href', () => {
      expect(a.attributes().href).toBe('#')
    })

    it('it emits a click event', () => {
      a.trigger('click')
      expect(wrapper.emitted().click).toBeTruthy()
    })

    it('it prevents the default event', () => {
      let preventDefaultCalled = false
      const event = {
        preventDefault: () => { preventDefaultCalled = true }
      }
      a.trigger('click', event)
      expect(preventDefaultCalled).toBe(true)
    })
  })
  
  it('it renders slot contents', () => {
    expect(wrapper.contains('some-slot-content')).toBe(true)
  })
})
