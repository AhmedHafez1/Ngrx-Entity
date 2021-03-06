import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { CourseActions, CourseActionTypes } from "./course.action";
import { Course } from "./model/course";

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialCoursesState: CoursesState = adapter.getInitialState({
  allCoursesLoaded: false,
});

export const courseReducer = (
  state: CoursesState = initialCoursesState,
  action: CourseActions
) => {
  switch (action.type) {
    case CourseActionTypes.CourseLoaded:
      return adapter.addOne(action.payload["course"], state);
    case CourseActionTypes.AllCoursesLoaded:
      return adapter.addAll(action.payload["courses"], {
        ...state,
        allCoursesLoaded: true,
      });
    case CourseActionTypes.SavedCourse:
      return adapter.updateOne(action.payload["course"], state);
    default:
      return state;
  }
};

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
