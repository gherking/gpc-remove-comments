export enum CommentType {
  NONE = 0,
  BEFORE_TAGS = 1 << 0,
  PRECEDING = 1 << 1,
  DESCRIPTION = 1 << 2,
  TAG = 1 << 3,
  ROW = 1 << 4,
  DOC_STRING = 1 << 5,
  STEP = 1 << 6,
  START = 1 << 7,
  END = 1 << 8,
  ALL = BEFORE_TAGS | PRECEDING | DESCRIPTION | TAG | ROW | DOC_STRING | STEP | START | END
}

export interface RemoveCommentsOptions {
  keep?: CommentType;
}