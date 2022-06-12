import { Update } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { Course } from "./model/course";
export enum CourseActionTypes {
  CourseRequested = "[View Course Page] Course Requested",
  CourseLoaded = "[Courses API] Course Loaded",
  AllCoursesRequested = "[Courses Home Page] All Courses Requested",
  AllCoursesLoaded = "[Courses API] All Courses Loaded",
  SavedCourse = "[Edit Dialog] Saved Course",
}

export class CourseRequestedAction implements Action {
  type = CourseActionTypes.CourseRequested;

  constructor(public payload: { courseId: number }) {}
}

export class CourseLoadedAction implements Action {
  type = CourseActionTypes.CourseLoaded;

  constructor(public payload: { course: Course }) {}
}

export class AllCoursesRequestedAction implements Action {
  type = CourseActionTypes.AllCoursesRequested;
  constructor(public payload: any) {}
}

export class AllCoursesLoadedAction implements Action {
  type = CourseActionTypes.AllCoursesLoaded;

  constructor(public payload: { courses: Course[] }) {}
}

export class SavedCourseAction implements Action {
  type = CourseActionTypes.SavedCourse;

  constructor(public payload: { course: Update<Course> }) {}
}

export type CourseActions =
  | CourseRequestedAction
  | CourseLoadedAction
  | AllCoursesRequestedAction
  | AllCoursesLoadedAction;
