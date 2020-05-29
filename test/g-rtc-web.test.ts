import Rtc from '../src/g-rtc-web'

/**
 * Rtc test
 */
describe('Rtc test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('Rtc is instantiable', () => {
    expect(new Rtc()).toBeInstanceOf(Rtc)
  })
})
