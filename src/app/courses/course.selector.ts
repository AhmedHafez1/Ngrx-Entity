import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState } from "./course.reducer";
import * as fromCourse from "./course.reducer";

export const selectCoursesState =
  createFeatureSelector<CoursesState>("courses");

export const selectCourseById = (courseId) =>
  createSelector(
    selectCoursesState,
    (coursesState) => coursesState.entities[courseId]
  );

export const selectAllCourses = createSelector(
  selectCoursesState,
  fromCourse.selectAll
);

export const allCoursesLoadedSelector = createSelector(
  selectCoursesState,
  (state) => state.allCoursesLoaded
);

export const selectBiginnerCourses = createSelector(
  selectAllCourses,
  (courses) => {
    return courses.filter((course) => course.category === "BEGINNER");
  }
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  (courses) => {
    return courses.filter((course) => course.category === "ADVANCED");
  }
);

export const selectPromoTotal = createSelector(selectAllCourses, (courses) => {
  return courses.filter((course) => course.promo).length;
});
