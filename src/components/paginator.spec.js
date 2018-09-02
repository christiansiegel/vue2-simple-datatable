import { shallowMount } from '@vue/test-utils'
import Paginator from './paginator.vue'
import PaginatorItem from './paginator-item.vue'

describe('paginator.vue', () =>  {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Paginator, {
      propsData: {
        total: 100,
        current: 0
      }
    })
  })

  it('it is a bootstrap 4 pagination', () => {
    expect(wrapper.is('nav')).toBe(true)
    expect(wrapper.find('ul').classes()).toContain('pagination')
  })

  it('it centers the pagination items', () => {
    expect(wrapper.find('ul').classes()).toContain('justify-content-center')
  })

  it('it uses a default chunk size of 10 pages', () => {
    wrapper.setProps({
      total: 1337,
      current: 0
    })
    expect(wrapper.findAll(PaginatorItem).length).toBe(2 + 10 + 2)
  })

  describe('when having a total of 0 pages', () => {
    beforeEach(() => {
      wrapper.setProps({
        total: 0,
        current: 0
      })
    })

    it('it hast 4 PaginatorItems', () => {
      expect(wrapper.findAll(PaginatorItem).length).toBe(2 + 2)
    })

    describe('its \'first\' PaginatorItem', () => {
      let item

      beforeEach(() => {
        item = wrapper.findAll(PaginatorItem).at(0);
      })

      it('it is disabled', () => {
        expect(item.attributes().disabled).toBe('true')
      })

      it('it is not active', () => {
        expect(item.attributes().active).not.toBe('true')
      })

      it('it has an angle-double-left icon', () => {
        expect(item.find('i').classes()).toEqual(['fas' ,'fa-angle-double-left'])
      })
    })

    describe('its \'prev\' PaginatorItem', () => {
      let item

      beforeEach(() => {
        item = wrapper.findAll(PaginatorItem).at(1);
      })

      it('it is disabled', () => {
        expect(item.attributes().disabled).toBe('true')
      })

      it('it is not active', () => {
        expect(item.attributes().active).not.toBe('true')
      })

      it('it has an angle-left icon', () => {
        expect(item.find('i').classes()).toEqual(['fas' ,'fa-angle-left'])
      })
    })

    describe('its \'next\' PaginatorItem', () => {
      let item

      beforeEach(() => {
        item = wrapper.findAll(PaginatorItem).at(2);
      })

      it('it is disabled', () => {
        expect(item.attributes().disabled).toBe('true')
      })

      it('it is not active', () => {
        expect(item.attributes().active).not.toBe('true')
      })

      it('it has an angle-right icon', () => {
        expect(item.find('i').classes()).toEqual(['fas' ,'fa-angle-right'])
      })
    })

    describe('its \'last\' PaginatorItem', () => {
      let item

      beforeEach(() => {
        item = wrapper.findAll(PaginatorItem).at(3);
      })

      it('it is disabled', () => {
        expect(item.attributes().disabled).toBe('true')
      })

      it('it is not active', () => {
        expect(item.attributes().active).not.toBe('true')
      })

      it('it has an angle-double-right icon', () => {
        expect(item.find('i').classes()).toEqual(['fas' ,'fa-angle-double-right'])
      })
    })
  })

  describe('when having a total of 1 pages', () => {
    beforeEach(() => {
      wrapper.setProps({
        total: 1,
        current: 0
      })
    })

    it('it hast 5 PaginatorItems', () => {
      expect(wrapper.findAll(PaginatorItem).length).toBe(2 + 1 + 2)
    })

    describe('its \'first\' PaginatorItem', () => {
      let item

      beforeEach(() => {
        item = wrapper.findAll(PaginatorItem).at(0);
      })

      it('it is disabled', () => {
        expect(item.attributes().disabled).toBe('true')
      })

      it('it is not active', () => {
        expect(item.attributes().active).not.toBe('true')
      })

      it('it has an angle-double-left icon', () => {
        expect(item.find('i').classes()).toEqual(['fas' ,'fa-angle-double-left'])
      })
    })

    describe('its \'prev\' PaginatorItem', () => {
      let item

      beforeEach(() => {
        item = wrapper.findAll(PaginatorItem).at(1);
      })

      it('it is disabled', () => {
        expect(item.attributes().disabled).toBe('true')
      })

      it('it is not active', () => {
        expect(item.attributes().active).not.toBe('true')
      })

      it('it has an angle-left icon', () => {
        expect(item.find('i').classes()).toEqual(['fas' ,'fa-angle-left'])
      })
    })

    describe('its \'1\' PaginatorItem', () => {
      let item

      beforeEach(() => {
        item = wrapper.findAll(PaginatorItem).at(2);
      })

      it('it is not disabled', () => {
        expect(item.attributes().disabled).not.toBe('true')
      })

      it('it is active', () => {
        expect(item.attributes().active).toBe('true')
      })

      it('it has the right label', () => {
        expect(item.text()).toBe('1')
      })
    })

    describe('its \'next\' PaginatorItem', () => {
      let item

      beforeEach(() => {
        item = wrapper.findAll(PaginatorItem).at(3);
      })

      it('it is disabled', () => {
        expect(item.attributes().disabled).toBe('true')
      })

      it('it is not active', () => {
        expect(item.attributes().active).not.toBe('true')
      })

      it('it has an angle-right icon', () => {
        expect(item.find('i').classes()).toEqual(['fas' ,'fa-angle-right'])
      })
    })

    describe('its \'last\' PaginatorItem', () => {
      let item

      beforeEach(() => {
        item = wrapper.findAll(PaginatorItem).at(4);
      })

      it('it is disabled', () => {
        expect(item.attributes().disabled).toBe('true')
      })

      it('it is not active', () => {
        expect(item.attributes().active).not.toBe('true')
      })

      it('it has an angle-double-right icon', () => {
        expect(item.find('i').classes()).toEqual(['fas' ,'fa-angle-double-right'])
      })
    })
  })

  describe('when having a total of 5 pages and a chunk size of 3', () => {
    const total = 5
    beforeEach(() => {
      wrapper.setData({
        chunkSize: 3
      })
    })

    describe('when page 0 is selected', () => {
      let items

      beforeEach(() => {
        wrapper.setProps({
          total: total,
          current: 0
        })
        items = wrapper.findAll(PaginatorItem)
      })

      it('it hast 7 PaginatorItems', () => {
        expect(items.length).toBe(2 + 3 + 2)
      })

      describe('its \'first\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(0);
        })

        it('it is disabled', () => {
          expect(item.attributes().disabled).toBe('true')
        })
      })

      describe('its \'prev\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(1);
        })

        it('it is disabled', () => {
          expect(item.attributes().disabled).toBe('true')
        })
      })

      describe('its \'1\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(2);
        })

        it('it is active', () => {
          expect(item.attributes().active).toBe('true')
        })
  
        it('it has the right label', () => {
          expect(item.text()).toBe('1')
        })
  
        it('when clicked, select() is not emitted', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select).not.toBeTruthy()
        })
      })

      describe('its \'2\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(3);
        })

        it('it is not active', () => {
          expect(item.attributes().active).not.toBe('true')
        })
  
        it('it has the right label', () => {
          expect(item.text()).toBe('2')
        })
  
        it('when clicked, select() is emitted with the right value', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select[0]).toEqual([1])
        })
      })

      describe('its \'3\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(4);
        })

        it('it is not active', () => {
          expect(item.attributes().active).not.toBe('true')
        })
  
        it('it has the right label', () => {
          expect(item.text()).toBe('3')
        })
  
        it('when clicked, select() is emitted with the right value', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select[0]).toEqual([2])
        })
      })

      describe('its \'next\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(5);
        })

        it('it is not disabled', () => {
          expect(item.attributes().disabled).not.toBe('true')
        })
  
        it('when clicked, select() is emitted with the right value', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select[0]).toEqual([1])
        })
      })

      describe('its \'last\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(6);
        })

        it('it is not disabled', () => {
          expect(item.attributes().disabled).not.toBe('true')
        })
  
        it('when clicked select() is emitted with the right value', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select[0]).toEqual([4])
        })
      })
    })

    describe('when page 1 is selected', () => {
      let items

      beforeEach(() => {
        wrapper.setProps({
          total: total,
          current: 1
        })
        items = wrapper.findAll(PaginatorItem)
      })

      it('it hast 7 PaginatorItems', () => {
        expect(items.length).toBe(2 + 3 + 2)
      })

      describe('its \'first\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(0);
        })

        it('it is not disabled', () => {
          expect(item.attributes().disabled).not.toBe('true')
        })

        it('when clicked, select() is emitted with the right value', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select[0]).toEqual([0])
        })
      })

      describe('its \'prev\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(1);
        })

        it('it is not disabled', () => {
          expect(item.attributes().disabled).not.toBe('true')
        })

        it('when clicked, select() is emitted with the right value', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select[0]).toEqual([0])
        })
      })

      describe('its \'1\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(2);
        })

        it('it is not active', () => {
          expect(item.attributes().active).not.toBe('true')
        })
  
        it('it has the right label', () => {
          expect(item.text()).toBe('1')
        })

        it('when clicked, select() is emitted with the right value', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select[0]).toEqual([0])
        })
      })

      describe('its \'2\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(3);
        })

        it('it is active', () => {
          expect(item.attributes().active).toBe('true')
        })
  
        it('it has the right label', () => {
          expect(item.text()).toBe('2')
        })
  
        it('when clicked, select() is not emitted', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select).not.toBeTruthy()
        })
      })

      describe('its \'3\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(4);
        })

        it('it is not active', () => {
          expect(item.attributes().active).not.toBe('true')
        })
  
        it('it has the right label', () => {
          expect(item.text()).toBe('3')
        })
  
        it('when clicked, select() is emitted with the right value', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select[0]).toEqual([2])
        })
      })

      describe('its \'next\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(5);
        })

        it('it is not disabled', () => {
          expect(item.attributes().disabled).not.toBe('true')
        })
  
        it('when clicked, select() is emitted with the right value', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select[0]).toEqual([2])
        })
      })

      describe('its \'last\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(6);
        })

        it('it is not disabled', () => {
          expect(item.attributes().disabled).not.toBe('true')
        })
  
        it('when clicked select() is emitted with the right value', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select[0]).toEqual([4])
        })
      })
    })

    describe('when page 2 is selected', () => {
      let items

      beforeEach(() => {
        wrapper.setProps({
          total: total,
          current: 2
        })
        items = wrapper.findAll(PaginatorItem)
      })

      it('it hast 7 PaginatorItems', () => {
        expect(items.length).toBe(2 + 3 + 2)
      })

      describe('its \'first\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(0);
        })

        it('it is not disabled', () => {
          expect(item.attributes().disabled).not.toBe('true')
        })

        it('when clicked, select() is emitted with the right value', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select[0]).toEqual([0])
        })
      })

      describe('its \'prev\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(1);
        })

        it('it is not disabled', () => {
          expect(item.attributes().disabled).not.toBe('true')
        })

        it('when clicked, select() is emitted with the right value', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select[0]).toEqual([1])
        })
      })

      describe('its \'1\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(2);
        })

        it('it is not active', () => {
          expect(item.attributes().active).not.toBe('true')
        })
  
        it('it has the right label', () => {
          expect(item.text()).toBe('1')
        })

        it('when clicked, select() is emitted with the right value', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select[0]).toEqual([0])
        })
      })

      describe('its \'2\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(3);
        })

        it('it is not active', () => {
          expect(item.attributes().active).not.toBe('true')
        })
  
        it('it has the right label', () => {
          expect(item.text()).toBe('2')
        })
  
        it('when clicked, select() is emitted with the right value', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select[0]).toEqual([1])
        })
      })

      describe('its \'3\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(4);
        })

        it('it is active', () => {
          expect(item.attributes().active).toBe('true')
        })
  
        it('it has the right label', () => {
          expect(item.text()).toBe('3')
        })
  
        it('when clicked, select() is not emitted', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select).not.toBeTruthy()
        })
      })

      describe('its \'next\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(5);
        })

        it('it is not disabled', () => {
          expect(item.attributes().disabled).not.toBe('true')
        })
  
        it('when clicked, select() is emitted with the right value', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select[0]).toEqual([3])
        })
      })

      describe('its \'last\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(6);
        })

        it('it is not disabled', () => {
          expect(item.attributes().disabled).not.toBe('true')
        })
  
        it('when clicked select() is emitted with the right value', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select[0]).toEqual([4])
        })
      })
    })

    describe('when page 3 is selected', () => {
      let items

      beforeEach(() => {
        wrapper.setProps({
          total: total,
          current: 3
        })
        items = wrapper.findAll(PaginatorItem)
      })

      it('it hast 6 PaginatorItems', () => {
        expect(items.length).toBe(2 + 2 + 2)
      })

      describe('its \'first\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(0);
        })

        it('it is not disabled', () => {
          expect(item.attributes().disabled).not.toBe('true')
        })

        it('when clicked, select() is emitted with the right value', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select[0]).toEqual([0])
        })
      })

      describe('its \'prev\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(1);
        })

        it('it is not disabled', () => {
          expect(item.attributes().disabled).not.toBe('true')
        })

        it('when clicked, select() is emitted with the right value', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select[0]).toEqual([2])
        })
      })

      describe('its \'4\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(2);
        })

        it('it is active', () => {
          expect(item.attributes().active).toBe('true')
        })
  
        it('it has the right label', () => {
          expect(item.text()).toBe('4')
        })
  
        it('when clicked, select() is not emitted', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select).not.toBeTruthy()
        })
      })

      describe('its \'5\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(3);
        })

        it('it is not active', () => {
          expect(item.attributes().active).not.toBe('true')
        })
  
        it('it has the right label', () => {
          expect(item.text()).toBe('5')
        })
  
        it('when clicked, select() is emitted with the right value', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select[0]).toEqual([4])
        })
      })

      describe('its \'next\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(4);
        })

        it('it is not disabled', () => {
          expect(item.attributes().disabled).not.toBe('true')
        })
  
        it('when clicked, select() is emitted with the right value', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select[0]).toEqual([4])
        })
      })

      describe('its \'last\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(5);
        })

        it('it is not disabled', () => {
          expect(item.attributes().disabled).not.toBe('true')
        })
  
        it('when clicked select() is emitted with the right value', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select[0]).toEqual([4])
        })
      })
    })

    describe('when page 4 is selected', () => {
      let items

      beforeEach(() => {
        wrapper.setProps({
          total: total,
          current: 4
        })
        items = wrapper.findAll(PaginatorItem)
      })

      it('it hast 6 PaginatorItems', () => {
        expect(items.length).toBe(2 + 2 + 2)
      })

      describe('its \'first\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(0);
        })

        it('it is not disabled', () => {
          expect(item.attributes().disabled).not.toBe('true')
        })

        it('when clicked, select() is emitted with the right value', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select[0]).toEqual([0])
        })
      })

      describe('its \'prev\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(1);
        })

        it('it is not disabled', () => {
          expect(item.attributes().disabled).not.toBe('true')
        })

        it('when clicked, select() is emitted with the right value', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select[0]).toEqual([3])
        })
      })

      describe('its \'4\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(2);
        })

        it('it is not active', () => {
          expect(item.attributes().active).not.toBe('true')
        })
  
        it('it has the right label', () => {
          expect(item.text()).toBe('4')
        })
  
        it('when clicked, select() is emitted with the right value', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select[0]).toEqual([3])
        })
      })

      describe('its \'5\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(3);
        })

        it('it is active', () => {
          expect(item.attributes().active).toBe('true')
        })
  
        it('it has the right label', () => {
          expect(item.text()).toBe('5')
        })
  
        it('when clicked, select() is not emitted', () => {
          item.vm.$emit('click')
          expect(wrapper.emitted().select).not.toBeTruthy()
        })
      })

      describe('its \'next\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(4);
        })

        it('it is disabled', () => {
          expect(item.attributes().disabled).toBe('true')
        })
      })

      describe('its \'last\' PaginatorItem', () => {
        let item
  
        beforeEach(() => {
          item = items.at(5);
        })

        it('it is disabled', () => {
          expect(item.attributes().disabled).toBe('true')
        })
      })
    })
  })
})
