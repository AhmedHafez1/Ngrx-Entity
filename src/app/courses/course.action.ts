import { Action } from "@ngrx/store";
import { Course } from "./model/course";
export enum CourseActionTypes {
  CourseRequested = "[View Course Page] Course Requested",
  CourseLoaded = "[Courses API] Course Loaded",
}

export class CourseRequestedAction implements Action {
  type = CourseActionTypes.CourseRequested;

  constructor(public payload: { courseId: number }) {}
}

export class CourseLoadedAction implements Action {
  type = CourseActionTypes.CourseLoaded;

  constructor(public payload: { course: Course }) {}
}

export type CourseActions = CourseRequestedAction | CourseLoadedAction;
