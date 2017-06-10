// MIT © 2017 azu
import * as React from "react";
import { GitHubSearchListState } from "../../../../store/GitHubSearchListStore/GitHubSearchListStore";
import { SearchQueryList } from "../../../project/SearchQueryList/SearchQueryList";
import { GitHubSearchQuery } from "../../../../domain/GitHubSearch/GitHubSearchList/GitHubSearchQuery";
import { SyntheticEvent } from "react";
import { BaseContainer } from "../../BaseContainer";
import { createSearchGitHubAndOpenStreamUseCase } from "../../../../use-case/GitHubSearchList/SearchGitHubAndOpenStreamUseCase";
import classNames from "classnames";
import { CommandBar, IconButton, Label } from "office-ui-fabric-react";
import { OpenQuickIssueUseCase } from "../../../../use-case/QuickIssue/OpenQuickIssueUseCase";
import { OpenQueryPanelUseCase } from "../../../../use-case/GitHubSearchList/ToggleQueryPanelUseCase";
import { GitHubSettingState } from "../../../../store/GitHubSettingStore/GitHubSettingStore";
import { createDeleteQueryUseCase } from "../../../../use-case/GitHubSearchList/DeleteQueryUseCase";

export interface GitHubSearchContainerProps {
    className?: string;
    gitHubSetting: GitHubSettingState;
    gitHubSearchList: GitHubSearchListState;
}

export class GitHubSearchContainer extends BaseContainer<GitHubSearchContainerProps, {}> {
    menuItems = [
        {
            key: "newItem",
            name: "Quick Issue",
            icon: "EditMirrored",
            ariaLabel: "Quick New Issue",
            onClick: () => {
                return this.useCase(new OpenQuickIssueUseCase()).executor(useCase => useCase.execute());
            }
        }
    ];

    onClickQuery = (_event: SyntheticEvent<any>, query: GitHubSearchQuery) => {
        this.useCase(createSearchGitHubAndOpenStreamUseCase()).executor(useCase => useCase.execute(query));
    };

    onEditQuery = (_event: SyntheticEvent<any>, query: GitHubSearchQuery) => {
        this.useCase(new OpenQueryPanelUseCase()).executor(useCase => useCase.execute(query));
    };

    onDeleteQuery = (_event: SyntheticEvent<any>, query: GitHubSearchQuery) => {
        this.useCase(createDeleteQueryUseCase()).executor(useCase => useCase.execute(query));
    };

    onClickAddingQuery = () => {
        this.useCase(new OpenQueryPanelUseCase()).executor(useCase => useCase.execute());
    };

    render() {
        return (
            <div className={classNames("GitHubSearchContainer", this.props.className)}>
                <h1 className="ms-font-xxl">
                    Queries
                    <IconButton
                        iconProps={{ iconName: "Add" }}
                        title="Add query"
                        ariaLabel="Add query"
                        onClick={this.onClickAddingQuery}
                    />
                </h1>
                <SearchQueryList
                    queries={this.props.gitHubSearchList.queries}
                    onClickQuery={this.onClickQuery}
                    onEditQuery={this.onEditQuery}
                    onDeleteQuery={this.onDeleteQuery}
                />
            </div>
        );
    }
}
