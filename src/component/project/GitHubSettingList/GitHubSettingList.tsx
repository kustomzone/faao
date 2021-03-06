// MIT © 2017 azu
import * as React from "react";
import { SyntheticEvent } from "react";
import {
    ContextualMenu,
    ContextualMenuItemType,
    DirectionalHint,
    Facepile,
    FocusZoneDirection,
    IFacepilePersona,
    IFacepileProps,
    PersonaSize
} from "office-ui-fabric-react";
import { GitHubSetting } from "../../../domain/GitHubSetting/GitHubSetting";

export const createFacepilePersonas = (
    settings: GitHubSetting[],
    onClickHandler: (event: React.MouseEvent<HTMLElement>, setting: GitHubSetting) => void
): IFacepilePersona[] => {
    return settings.map((setting): IFacepilePersona => {
        return {
            personaName: setting.id.toValue(),
            onClick: (event: React.MouseEvent<HTMLElement>) => {
                onClickHandler(event, setting);
            }
        };
    });
};

export interface GitHubSettingListProps {
    settings: GitHubSetting[];
    onClickAddSetting: (event: SyntheticEvent<any>) => void;
    onClickSetting: (event: SyntheticEvent<any>, setting: GitHubSetting) => void;
    onEditSetting: (event: SyntheticEvent<any>, setting: GitHubSetting) => void;
    onDeleteSetting: (event: SyntheticEvent<any>, setting: GitHubSetting) => void;
}

export interface GitHubSettingListState {
    contextTarget?: EventTarget & HTMLElement;
    contextTargetSetting?: GitHubSetting;
    isContextMenuVisible: boolean;
}

export class GitHubSettingList extends React.Component<
    GitHubSettingListProps,
    GitHubSettingListState
> {
    constructor() {
        super();
        this.state = {
            contextTarget: undefined,
            contextTargetSetting: undefined,
            isContextMenuVisible: false
        };
    }

    showContextMenu = (event: React.MouseEvent<HTMLElement>, setting: GitHubSetting) => {
        this.setState({
            contextTarget: event.currentTarget,
            contextTargetSetting: setting,
            isContextMenuVisible: true
        });
    };

    onClick = (event: React.MouseEvent<HTMLElement>, setting: GitHubSetting) => {
        this.props.onClickSetting(event, setting);
        this.showContextMenu(event, setting);
    };
    onEditSetting = (event: React.MouseEvent<HTMLElement>) => {
        const setting = this.state.contextTargetSetting;
        if (setting) {
            this.props.onEditSetting(event, setting);
        }
    };
    onDeleteSetting = (event: React.MouseEvent<HTMLElement>) => {
        const setting = this.state.contextTargetSetting;
        if (setting) {
            if (confirm(`Does delete "${setting.id.toValue()}"?`)) {
                this.props.onDeleteSetting(event, setting);
            }
        }
    };

    render() {
        const contextTarget = this.state.contextTarget;
        const contextMenu = contextTarget && this.state.isContextMenuVisible
            ? <ContextualMenu
                  shouldFocusOnMount={true}
                  target={contextTarget}
                  directionalHint={DirectionalHint.bottomRightEdge}
                  arrowDirection={FocusZoneDirection.vertical}
                  onDismiss={() => {
                      this.setState({
                          contextTarget: undefined,
                          isContextMenuVisible: false
                      });
                  }}
                  items={[
                      {
                          key: "label",
                          itemType: ContextualMenuItemType.Header,
                          name: this.state.contextTargetSetting!.id.toValue()
                      },
                      {
                          key: "edit-setting",
                          iconProps: {
                              iconName: "Edit"
                          },
                          onClick: (event: React.MouseEvent<HTMLElement>) => {
                              this.onEditSetting(event);
                          },
                          name: "Edit Setting"
                      },
                      {
                          key: "delete-setting",
                          iconProps: {
                              iconName: "Delete"
                          },
                          onClick: (event: React.MouseEvent<HTMLElement>) => {
                              this.onDeleteSetting(event);
                          },
                          name: "Delete Setting"
                      }
                  ]}
              />
            : null;
        const facepileProps: IFacepileProps = {
            personaSize: PersonaSize.small,
            personas: createFacepilePersonas(this.props.settings, this.onClick),
            ariaDescription: "Your GitHub account setting list",
            showAddButton: true,
            addButtonProps: {
                ariaLabel: "Add a setting",
                onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
                    this.props.onClickAddSetting(event);
                }
            }
        };
        return (
            <div className="GitHubSettingList">
                {contextMenu}
                <h1 className="GitHubSettingList-title ms-font-xxl">Accounts</h1>
                <Facepile {...facepileProps} />
            </div>
        );
    }
}
