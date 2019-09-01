import { Instant } from '../../domain/general';
import { Injectable } from '@angular/core';
import { ScheduledClass, Lesson, LessonId, ClassId, ClassState, Booking, Place } from '../../domain/reservation';
import { ClassService } from '../class.service';

const Aurel = {
  id: '1',
  displayName: 'Aurélien'
};
const Lea = {
  id: '2',
  displayName: 'Léa'
};
const AliceD = {
  id: '3',
  displayName: 'Alice D.'
};
const AliceF = {
  id: '4',
  displayName: 'AliceF'
};
const Amandine = {
  id: '5',
  displayName: 'Amandine'
};

const DAY = 24*60*60*1000;

const commonInfo = {
  description: '',
  photos: [],
  place: {
    id: '1',
    name: 'Villa',
    address: 'ptit boui boui',
    plan: ''
  },
  teacher: {
    id: '0',
    displayName: 'Cyril'
  }
};
const monday: Lesson = {
  id: '1',
  title: 'Lundi detox',
  maxStudents: 10,
  ...commonInfo
};
const tuesday: Lesson = {
  id: '2',
  title: 'Mardi transpi',
  maxStudents: 10,
  ...commonInfo
};
const thursday: Lesson = {
  id: '3',
  title: 'Jeudi alignement',
  maxStudents: 4,
  ...commonInfo
};
const friday: Lesson = {
  id: '4',
  title: 'Vendredi',
  maxStudents: 4,
  ...commonInfo
};
const lessons = [monday, tuesday, thursday, friday];


const monday20190826: ScheduledClass = {
  id: Date.now() + '_' + Math.random(),
  start: new Date(2019, 7, 26, 18, 45).valueOf(),
  end: new Date(2019, 7, 26, 20).valueOf(),
  state: ClassState.OPENED,
  bookings: {
    all: [{
      bookDate: new Date(2019, 7, 22, 14, 30).valueOf(),
      bookedBy: Aurel,
      student: Aurel
    }, {
      bookDate: new Date(2019, 7, 22, 16, 30).valueOf(),
      bookedBy: AliceD,
      student: AliceD
    }, {
      bookDate: new Date(2019, 7, 24, 8).valueOf(),
      bookedBy: Lea,
      student: Lea
    }, {
      bookDate: new Date(2019, 7, 25, 12).valueOf(),
      bookedBy: Amandine,
      student: Amandine
    }],
    approved: [{
      bookDate: new Date(2019, 7, 22, 14, 30).valueOf(),
      bookedBy: Aurel,
      student: Aurel
    }, {
      bookDate: new Date(2019, 7, 22, 16, 30).valueOf(),
      bookedBy: AliceD,
      student: AliceD
    }, {
      bookDate: new Date(2019, 7, 24, 8).valueOf(),
      bookedBy: Lea,
      student: Lea
    }, {
      bookDate: new Date(2019, 7, 25, 12).valueOf(),
      bookedBy: Amandine,
      student: Amandine
    }],
    waiting: []
  },
  lesson: lessons[0]
};
const tuesday20190827: ScheduledClass = {
  id: Date.now() + '_' + Math.random(),
  start: new Date(2019, 7, 27, 18, 45).valueOf(),
  end: new Date(2019, 7, 27, 20).valueOf(),
  state: ClassState.OPENED,
  bookings: {
    all: [{
      bookDate: new Date(2019, 7, 22, 16, 30).valueOf(),
      bookedBy: AliceD,
      student: AliceD
    }, {
      bookDate: new Date(2019, 7, 24, 8).valueOf(),
      bookedBy: Lea,
      student: Lea
    }, {
      bookDate: new Date(2019, 7, 25, 12).valueOf(),
      bookedBy: Amandine,
      student: Amandine
    }],
    approved: [{
      bookDate: new Date(2019, 7, 22, 16, 30).valueOf(),
      bookedBy: AliceD,
      student: AliceD
    }, {
      bookDate: new Date(2019, 7, 24, 8).valueOf(),
      bookedBy: Lea,
      student: Lea
    }, {
      bookDate: new Date(2019, 7, 25, 12).valueOf(),
      bookedBy: Amandine,
      student: Amandine
    }],
    waiting: []
  },
  lesson: lessons[1]
};
const thursday20190829: ScheduledClass = {
  id: Date.now() + '_' + Math.random(),
  start: new Date(2019, 7, 29, 18, 45).valueOf(),
  end: new Date(2019, 7, 29, 20).valueOf(),
  state: ClassState.OPENED,
  bookings: {
    all: [{
      bookDate: new Date(2019, 7, 22, 14, 30).valueOf(),
      bookedBy: Aurel,
      student: Aurel
    }, {
      bookDate: new Date(2019, 7, 22, 16, 30).valueOf(),
      bookedBy: AliceD,
      student: AliceD
    }, {
      bookDate: new Date(2019, 7, 24, 8).valueOf(),
      bookedBy: Lea,
      student: Lea
    }, {
      bookDate: new Date(2019, 7, 25, 12).valueOf(),
      bookedBy: Amandine,
      student: Amandine
    }, {
      bookDate: new Date(2019, 7, 27, 12).valueOf(),
      bookedBy: AliceF,
      student: AliceF
    }],
    approved: [{
      bookDate: new Date(2019, 7, 22, 14, 30).valueOf(),
      bookedBy: Aurel,
      student: Aurel
    }, {
      bookDate: new Date(2019, 7, 22, 16, 30).valueOf(),
      bookedBy: AliceD,
      student: AliceD
    }, {
      bookDate: new Date(2019, 7, 24, 8).valueOf(),
      bookedBy: Lea,
      student: Lea
    }, {
      bookDate: new Date(2019, 7, 25, 12).valueOf(),
      bookedBy: Amandine,
      student: Amandine
    }],
    waiting: [{
      bookDate: new Date(2019, 7, 27, 12).valueOf(),
      bookedBy: AliceF,
      student: AliceF
    }]
  },
  lesson: lessons[2]
};


@Injectable({
  providedIn: 'root'
})
export class MockedClassService implements ClassService {
  async getClassInfo(scheduledClass: ClassId): Promise<ScheduledClass> {
    throw new Error("Not implemented");
  }

  async register(lesson: Lesson): Promise<Lesson> {
    throw new Error("Not implemented");
    // return Promise.resolve({
    //   id: Date.now() + '_' + Math.random(),
    //   ...info
    // });
  }

  async schedule(lesson: LessonId, start: Instant, end: Instant): Promise<ScheduledClass> {
    throw new Error("Not implemented");
  }

  async cancel(scheduledClass: ClassId): Promise<ScheduledClass> {
    throw new Error("Not implemented");
  }

  async list(): Promise<ScheduledClass[]> {
    return Promise.resolve([
      monday20190826,
      tuesday20190827,
      thursday20190829
    ]);
  }

  async changePlace(scheduledClass: ClassId, newSpot: Place): Promise<ScheduledClass> {
    throw new Error("Not implemented");
  }
}
