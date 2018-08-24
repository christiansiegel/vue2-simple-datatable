
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
    expect(typeof Paginator.props).toBe('object')
    const props = Paginator.props
    expect(props).toEqual(jasmine.objectContaining({
      total: Number,
      current: Number
    }));
  })
})
