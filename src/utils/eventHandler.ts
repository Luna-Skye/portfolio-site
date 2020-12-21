//* ------------------------------------------------------- *//
// IMPORT MODULES -----------------------------------------  //
import P5 from 'p5'
import particles from '@/graphics/particles'
import snowfall from '@/graphics/snowfall'
import confetti from '@/graphics/confetti'

//* ------------------------------------------------------- *//
// INTERFACES ---------------------------------------------  //
interface DateObject {
  d: number;
  m: number;
  y: number;
}
export interface EventObject {
  title: string;
  criteria?: boolean;
  splash: string | string[];
  p5: Array<(p5: P5) => void>;
}

//* ------------------------------------------------------- *//
//  DEFINE EVENTS -----------------------------------------  //
const eventCheck = (callback: (d: DateObject) => boolean) => {
  const d = new Date()
  const date = {
    d: d.getDate(),
    m: d.getMonth() + 1,
    y: d.getFullYear()
  }
  return callback(date)
}

//* ------------------------------------------------------- *//
//  DEFINE EVENTS -----------------------------------------  //
export const events: EventObject[] = [
  { //* PRIDE MONTH --------------------------------------- *//
    title: 'PRIDE',
    criteria: eventCheck((d: DateObject) => (d.m === 6)),
    splash: ['PROUD TO BE ME', 'TRANS PAN'],
    p5: [particles({}), snowfall()]
  },
  { //* CHRISTMAS EVENT - SNOWFALL ------------------------ *//
    title: 'CHRISTMAS',
    criteria: eventCheck(
      (d: DateObject) => (
        d.m === 12 &&
        (d.d === 24 || d.d === 25)
      )
    ),
    splash: ['MERRY CHRISTMAS', 'HAPPY HOLIDAYS'],
    p5: [snowfall()]
  },
  { //* NEW YEARS EVENT - CONFETTI ------------------------ *//
    title: 'NEW YEARS',
    criteria: eventCheck((d: DateObject) => (d.m === 1 && d.d === 1)),
    splash: ['HAPPY NEW YEAR', '2021'],
    p5: [confetti()]
  }
]

//* ------------------------------------------------------- *//
//  GET CURRENT EVENT ------------------------------------- *//
export const getEvent = (): EventObject => {
  // Check all Events and Return first applicable
  for (const e in events) if (events[e].criteria) return events[e]

  // Otherwise Return Default
  return {
    title: 'NONE',
    splash: ['SOMEDAY', 'SEPSHUN'],
    p5: [particles({
      dotSize: { min: 0, max: 0.4 },
      lineDist: 100
    })]
  }
}
