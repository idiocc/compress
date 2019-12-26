import { debuglog } from 'util'
import Http from '@contexts/http'
import Goa from '@goa/goa/src'

const LOG = debuglog('@goa/compress')

/**
 * A testing context for the package.
 */
export default class Context extends Http {
  get app() {
    if (this._app) return this._app
    this._app = new Goa()
    return this._app
  }
  get text() {
    return `I stood in silence where I was, for I did not know what to do. Of bell or knocker there was no sign. Through these frowning walls and dark window openings it was not likely that my voice could penetrate. The time I waited seemed endless, and I felt doubts and fears crowding upon me. What sort of place had I come to, and among what kind of people? What sort of grim adventure was it on which I had embarked? Was this a customary incident in the life of a solicitor's clerk sent out to explain the purchase of a London estate to a foreigner? Solicitor's clerk! Mina would not like that. Solicitor, for just before leaving London I got word that my examination was successful, and I am now a full-blown solicitor! I began to rub my eyes and pinch myself to see if I were awake. It all seemed like a horrible nightmare to me, and I expected that I should suddenly awake, and find myself at home, with the dawn struggling in through the windows, as I had now and again felt in the morning after a day of overwork. But my flesh answered the pinching test, and my eyes were not to be deceived. I was indeed awake and among the Carpathians. All I could do now was to be patient, and to wait the coming of morning.`
  }
}

/** @typedef {Object<string, Test & TestSuite4>} TestSuite */
/** @typedef {Object<string, Test & TestSuite3>} TestSuite4 */
/** @typedef {Object<string, Test & TestSuite2>} TestSuite3 */
/** @typedef {Object<string, Test & TestSuite1>} TestSuite2 */
/** @typedef {Object<string, Test & TestSuite0>} TestSuite1 */
/** @typedef {Object<string, Test>} TestSuite0 */
/** @typedef {(c: Context)} Test */
