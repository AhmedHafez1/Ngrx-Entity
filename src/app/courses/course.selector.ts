import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState } from "./course.reducer";

export const selectCoursesState = createFeatureSelector<CoursesState>("courses");

export const selectCourseById = (courseId) =>
  createSelector(
    selectCoursesState,
    (coursesState) => coursesState.entities[courseId]
  );
