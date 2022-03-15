import { PreCompiler } from "gherking";
import { Background, DocString, Document, Examples, Feature, Rule, Scenario, ScenarioOutline, Step, TableRow, Tag } from "gherkin-ast";
import { CommentType, RemoveCommentsOptions } from "./types";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require("debug")("gpc:remove-comments");

class RemoveComments implements PreCompiler {
    private readonly config: RemoveCommentsOptions;

    constructor(config?: Partial<RemoveCommentsOptions>) {
        debug("Intialize");
        /* istanbul ignore next */
        this.config = {
            keep: CommentType.NONE,
            ...(config || {})
        }
    }

    private shouldRemove(type: CommentType): boolean {
        const b = !(this.config.keep & type);
        debug("shouldRemove(type: %d, keep: %d) -> %b", type, this.config.keep, b);
        return b;
    }

    private removeCommentIfNecessary<T>(o: T, k: keyof T, type: CommentType): void {
        /* istanbul ignore next */
        debug("removeCommentIfNecessary(o: %s, k: %s, type: %s)", o?.constructor?.name, k, type);
        if (o[k] && this.shouldRemove(type)) {
            o[k] = null;
        }
    }

    onDocument(d: Document): void {
        this.removeCommentIfNecessary<Document>(d, "startComment", CommentType.START);
        this.removeCommentIfNecessary<Document>(d, "endComment", CommentType.END);
    }

    onStep(s: Step): void {
        this.removeCommentIfNecessary<Step>(s, "comment", CommentType.STEP);
    }

    onDocString(ds: DocString): void {
        this.removeCommentIfNecessary<DocString>(ds, "comment", CommentType.DOC_STRING);
    }

    onTag(t: Tag): void {
        this.removeCommentIfNecessary<Tag>(t, "comment", CommentType.TAG);
    }

    onTableRow(r: TableRow): void {
        this.removeCommentIfNecessary<TableRow>(r, "comment", CommentType.ROW);
    }

    onFeature(f: Feature): void {
        this.removeCommentIfNecessary<Feature>(f, "tagComment", CommentType.BEFORE_TAGS);
        this.removeCommentIfNecessary<Feature>(f, "precedingComment", CommentType.PRECEDING);
        this.removeCommentIfNecessary<Feature>(f, "descriptionComment", CommentType.DESCRIPTION);
    }

    onRule(r: Rule): void {
        this.removeCommentIfNecessary<Rule>(r, "tagComment", CommentType.BEFORE_TAGS);
        this.removeCommentIfNecessary<Rule>(r, "precedingComment", CommentType.PRECEDING);
        this.removeCommentIfNecessary<Rule>(r, "descriptionComment", CommentType.DESCRIPTION);
    }

    onBackground(b: Background): void {
        this.removeCommentIfNecessary<Background>(b, "precedingComment", CommentType.PRECEDING);
        this.removeCommentIfNecessary<Background>(b, "descriptionComment", CommentType.DESCRIPTION);
    }

    onScenario(s: Scenario): void {
        this.removeCommentIfNecessary<Scenario>(s, "tagComment", CommentType.BEFORE_TAGS);
        this.removeCommentIfNecessary<Scenario>(s, "precedingComment", CommentType.PRECEDING);
        this.removeCommentIfNecessary<Scenario>(s, "descriptionComment", CommentType.DESCRIPTION);
    }

    onScenarioOutline(so: ScenarioOutline): void {
        this.removeCommentIfNecessary<ScenarioOutline>(so, "tagComment", CommentType.BEFORE_TAGS);
        this.removeCommentIfNecessary<ScenarioOutline>(so, "precedingComment", CommentType.PRECEDING);
        this.removeCommentIfNecessary<ScenarioOutline>(so, "descriptionComment", CommentType.DESCRIPTION);
    }

    onExamples(e: Examples): void {
        this.removeCommentIfNecessary<Examples>(e, "tagComment", CommentType.BEFORE_TAGS);
        this.removeCommentIfNecessary<Examples>(e, "precedingComment", CommentType.PRECEDING);
    }
}

export default RemoveComments;
export * from "./types";