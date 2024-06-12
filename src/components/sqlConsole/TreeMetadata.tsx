import cloneDeep from "lodash/cloneDeep";
import * as React from "react";

import { Button, Classes, Tree, type TreeNodeInfo } from "@blueprintjs/core";
import { ISideMenuData } from "../../models/sqlConsoleModels";

type NodePath = number[];

type TreeAction =
  | { type: "SET_IS_EXPANDED"; payload: { path: NodePath; isExpanded: boolean } }
  | { type: "DESELECT_ALL" }
  | { type: "SET_IS_SELECTED"; payload: { path: NodePath; isSelected: boolean } };

function forEachNode(nodes: TreeNodeInfo[] | undefined, callback: (node: TreeNodeInfo) => void) {
  if (nodes === undefined) {
    return;
  }

  for (const node of nodes) {
    callback(node);
    forEachNode(node.childNodes, callback);
  }
}

function forNodeAtPath(nodes: TreeNodeInfo[], path: NodePath, callback: (node: TreeNodeInfo) => void) {
  callback(Tree.nodeFromPath(path, nodes));
}

function treeReducer(state: TreeNodeInfo[], action: TreeAction) {
  switch (action.type) {
    case "DESELECT_ALL":
      const newState1 = cloneDeep(state);
      forEachNode(newState1, node => (node.isSelected = false));
      return newState1;
    case "SET_IS_EXPANDED":
      const newState2 = cloneDeep(state);
      forNodeAtPath(newState2, action.payload.path, node => (node.isExpanded = action.payload.isExpanded));
      return newState2;
    case "SET_IS_SELECTED":
      const newState3 = cloneDeep(state);
      forNodeAtPath(newState3, action.payload.path, node => (node.isSelected = action.payload.isSelected));
      return newState3;
    default:
      return state;
  }
}

interface TreeMetadataProps {
  sideMenu: ISideMenuData[]
}

export const TreeMetadata = ({ sideMenu }: TreeMetadataProps) => {
  const [nodes, dispatch] = React.useReducer(treeReducer, [...createNodes([...sideMenu])]);
  const handleNodeClick = React.useCallback(
    (node: TreeNodeInfo, nodePath: NodePath, e: React.MouseEvent<HTMLElement>) => {
      const originallySelected = node.isSelected;
      if (!e.shiftKey) {
        dispatch({ type: "DESELECT_ALL" });
      }
      dispatch({
        payload: { path: nodePath, isSelected: originallySelected == null ? true : !originallySelected },
        type: "SET_IS_SELECTED",
      });
    },
    [],
  );

  const handleNodeCollapse = React.useCallback((_node: TreeNodeInfo, nodePath: NodePath) => {
    dispatch({
      payload: { path: nodePath, isExpanded: false },
      type: "SET_IS_EXPANDED",
    });
  }, []);

  const handleNodeExpand = React.useCallback((_node: TreeNodeInfo, nodePath: NodePath) => {
    dispatch({
      payload: { path: nodePath, isExpanded: true },
      type: "SET_IS_EXPANDED",
    });
  }, []);

  return (
    <div style={{overflow: 'auto', width: 300}}>
      <Button text={'<<<<< Connect'} style={{width: '100%'}}></Button>
      <Tree
        contents={nodes}
        onNodeClick={handleNodeClick}
        onNodeCollapse={handleNodeCollapse}
        onNodeExpand={handleNodeExpand}
        className={Classes.ELEVATION_0}
      />
    </div>

  );
};

function createNodes(sideMenuData: ISideMenuData[]): TreeNodeInfo[] {
  // return INITIAL_STATE
  return sideMenuData.map((item, idx) => {
    return {
      id: idx,
      hasCaret: true,
      icon: 'th-list',
      label: item.label,
      childNodes: item.childs.map((item, idx) => ({
        id: idx,
        icon: 'column-layout',
        label: item
      }))
    }
  })
}

const INITIAL_STATE: TreeNodeInfo[] = [
  {
    id: 0,
    hasCaret: true,
    icon: "th-list",
    label: 'Table 1',
    childNodes: [
      {
        id: 2,
        icon: "column-layout",
        label: "Column 1",
      },
    ],
  },
  {
    id: 1,
    icon: "th-list",
    isExpanded: false,
    label: 'Table 2',
    childNodes: [
      {
        id: 0,
        icon: "column-layout",
        label: "Column 0",
      },
      {
        id: 1,
        icon: "column-layout",
        label: "Column 1",
      },
    ],
  },
];
