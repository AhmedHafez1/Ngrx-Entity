import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { CourseActions, CourseActionTypes } from "./course.action";
import { Course } from "./model/course";

export interface CoursesState extends EntityState<Course> {}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialCoursesState: CoursesState = adapter.getInitialState();

export const courseReducer = (
  state: CoursesState = initialCoursesState,
  action: CourseActions
) => {
  switch (action.type) {
    case CourseActionTypes.CourseLoaded:
      return adapter.addOne(action.payload["course"], state);

    default:
      return state;
  }
};
