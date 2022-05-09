import React, { useCallback } from 'react';
import { Space, Button } from '@douyinfe/semi-ui';
import { IconCopy, IconDelete } from '@douyinfe/semi-icons';
import { Tooltip } from 'components/tooltip';
import { BubbleMenu } from 'tiptap/editor/views/bubble-menu';
import { CodeBlock } from 'tiptap/core/extensions/code-block';
import { copyNode, deleteNode } from 'tiptap/prose-utils';
import { Divider } from 'tiptap/components/divider';

export const CodeBlockBubbleMenu = ({ editor }) => {
  const copyMe = useCallback(() => copyNode(CodeBlock.name, editor), [editor]);
  const deleteMe = useCallback(() => deleteNode(CodeBlock.name, editor), [editor]);

  return (
    <BubbleMenu
      className={'bubble-menu'}
      editor={editor}
      pluginKey="code-block-bubble-menu"
      shouldShow={() => editor.isActive(CodeBlock.name)}
      tippyOptions={{ maxWidth: 'calc(100vw - 100px)' }}
      getRenderContainer={(node) => {
        let container = node;
        while (container && container.classList && !container.classList.contains('node-codeBlock')) {
          container = container.parentElement;
        }
        return container;
      }}
    >
      <Space spacing={4}>
        <Tooltip content="复制">
          <Button onClick={copyMe} icon={<IconCopy />} type="tertiary" theme="borderless" size="small" />
        </Tooltip>

        <Divider />

        <Tooltip content="删除节点" hideOnClick>
          <Button onClick={deleteMe} icon={<IconDelete />} type="tertiary" theme="borderless" size="small" />
        </Tooltip>
      </Space>
    </BubbleMenu>
  );
};