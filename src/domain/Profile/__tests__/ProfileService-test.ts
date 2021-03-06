// MIT © 2017 azu
import { ProfileJSON } from "../Profile";
import { ProfileService } from "../ProfileService";

describe("ProfileService", () => {
    it("can export <-> import, as a result, same data", () => {
        const json: ProfileJSON = {
            GitHubSettings: [
                {
                    id: "github.com",
                    token: "GitHubSetting_Token_1",
                    apiHost: "https://api.github.com",
                    webHost: "https://github.com"
                },
                {
                    id: "ghe",
                    token: "GitHubSetting_Token_2",
                    apiHost: "https://example.com/api/v3",
                    webHost: "https://example.com"
                }
            ],
            GitHubSearchLists: [
                {
                    name: "SearchList_1",
                    queries: [
                        {
                            name: "query_a",
                            query: "repo:azu/faao",
                            color: "#000000",
                            gitHubSettingId: "github.com"
                        },
                        {
                            name: "query_b",
                            query: "repo:example/example",
                            color: "#ffffff",
                            gitHubSettingId: "github.com"
                        }
                    ]
                },
                {
                    name: "SearchList_2",
                    queries: [
                        {
                            name: "query_a",
                            query: "repo:ghe/ghe",
                            color: "#000111",
                            gitHubSettingId: "ghe"
                        },
                        {
                            name: "query_b",
                            query: "repo:example/example",
                            color: "#ffffff",
                            gitHubSettingId: "github.com"
                        }
                    ]
                }
            ]
        };
        const profile = ProfileService.fromJSON(json);
        expect(profile.GitHubSearchLists).toHaveLength(2);
        expect(profile.GitHubSettings).toHaveLength(2);
        const reJSON = ProfileService.toJSON(profile);
        expect(reJSON).toEqual(json);
    });
});
