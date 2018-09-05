import { shallowMount } from '@vue/test-utils'
import Dropdown from './dropdown.vue'

describe('dropdown.vue', () =>  {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Dropdown)
  })

  it('it renders a bootstrap dropdown', () => {
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('dropdown')
  })

  it('its toggle button has the \'current\' prop as label', () => {
    wrapper.setProps({
      current: 4711
    })
    expect(wrapper.find('button.dropdown-toggle').text()).toBe('4711')
  })

  it('it button has a random id', () => {
    const button = wrapper.find('button.dropdown-toggle')
    const buttonId = button.attributes()['id']

    const prefix = 'dropdownMenuButton-'

    expect(buttonId.length > prefix.length).toBe(true)
    expect(buttonId.substring(0, prefix.length)).toBe(prefix)
  })

  it('it has a dropdown menu that is labelled by the button', () => {
    const button = wrapper.find('button.dropdown-toggle')
    const buttonId = button.attributes()['id']

    const menu = wrapper.find('div.dropdown-menu')
    const menuLabelledby = menu.attributes()['aria-labelledby']

    expect(buttonId).toBe(menuLabelledby)
  })

  describe('it has a dropdown menu with dropdown items', () => {
    let items

    beforeEach(() => {
      wrapper.setProps({
        items: [4711, 4712, 4713]
      })
      items = wrapper.findAll('div.dropdown-menu > a.dropdown-item')
    })

    it('it has a dropdown item for every item in the prop \'items\'', () => {
      expect(items.length).toBe(3)
    })

    describe('a dropdown item', () => {
      let item4712

      beforeEach(() => {
        item4712 = items.at(1)
      })

      it('it has the item\'s value as label', () => {
        expect(item4712.text()).toBe('4712')
      })

      it('it emits a \'select\' event with the item\'s value', () => {
        item4712.trigger('click') // item '2'
        expect(wrapper.emitted().select[0]).toEqual([4712])
      })

      it('it prevents the default click event', () => {
        let preventDefaultCalled = false
        const event = {
          preventDefault: () => { preventDefaultCalled = true }
        }
        item4712.trigger('click', event)
        expect(preventDefaultCalled).toBe(true)
      })
    })
  })
})
