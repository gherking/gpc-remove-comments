import { load, process } from "gherking";
import { Document, pruneID } from "gherkin-ast";
import RemoveComments, { CommentType } from "../src";

const loadTestFeatureFile = async (folder: "input" | "expected", file: string): Promise<Document> => {
    const ast = pruneID(await load(`./tests/data/${folder}/${file}`)) as Document[];
    delete ast[0].sourceFile;
    delete ast[0].targetFile;
    delete ast[0].sourceFolder;
    delete ast[0].targetFolder;
    return ast[0];
}

describe("RemoveComments", () => {
    let base: Document;

    beforeAll(async () => {
        base = await loadTestFeatureFile("input", "test.feature");
    });

    test("should handle incorrect keep value", () => {
        expect(() => new RemoveComments({
            // @ts-ignore
            keep: "hello",
        })).toThrowError(TypeError);
        expect(() => new RemoveComments({
            // @ts-ignore
            keep: ["hello"],
        })).toThrowError(TypeError);
    });

    test("should clean all comments", async () => {
        const expected = await loadTestFeatureFile("expected", "test-none.feature");
        const actual = pruneID(process(base, new RemoveComments({
            keep: CommentType.NONE,
        }))) as Document[];

        delete expected.uri;
        delete actual[0].sourceFile;
        delete actual[0].sourceFolder;
        delete actual[0].targetFile;
        delete actual[0].targetFolder;
        delete actual[0].uri;

        expect(actual).toHaveLength(1);
        expect(actual[0]).toEqual(expected);
    });

    test("should keep all comments", async () => {
        const expected = await loadTestFeatureFile("expected", "test-all.feature");
        const actual = pruneID(process(base, new RemoveComments({
            keep: CommentType.ALL,
        }))) as Document[];

        delete expected.uri;
        delete actual[0].sourceFile;
        delete actual[0].sourceFolder;
        delete actual[0].targetFile;
        delete actual[0].targetFolder;
        delete actual[0].uri;

        expect(actual).toHaveLength(1);
        expect(actual[0]).toEqual(expected);
    });

    test("should handle comment type strings", async () => {
        const expected = await loadTestFeatureFile("expected", "test-all.feature");
        const actual = pruneID(process(base, new RemoveComments({
            // @ts-ignore
            keep: ["all"],
        }))) as Document[];

        delete expected.uri;
        delete actual[0].sourceFile;
        delete actual[0].sourceFolder;
        delete actual[0].targetFile;
        delete actual[0].targetFolder;
        delete actual[0].uri;

        expect(actual).toHaveLength(1);
        expect(actual[0]).toEqual(expected);
    });
});