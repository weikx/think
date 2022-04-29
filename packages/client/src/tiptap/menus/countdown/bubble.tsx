import { useCallback } from 'react';
import { Space, Button } from '@douyinfe/semi-ui';
import { IconEdit, IconDelete } from '@douyinfe/semi-icons';
import { Tooltip } from 'components/tooltip';
import { BubbleMenu } from 'tiptap/views/bubble-menu';
import { Countdown } from 'tiptap/extensions/countdown';
import { Divider } from 'tiptap/divider';
import { triggerOpenCountSettingModal } from '../_event';

export const CountdownBubbleMenu = ({ editor }) => {
  const attrs = editor.getAttributes(Countdown.name);

  const openEditLinkModal = useCallback(() => {
    triggerOpenCountSettingModal(attrs);
  }, [attrs]);

  const deleteNode = useCallback(() => editor.chain().deleteSelection().run(), [editor]);

  return (
    <BubbleMenu
      className={'bubble-menu'}
      editor={editor}
      pluginKey="countdonw-bubble-menu"
      shouldShow={() => editor.isActive(Countdown.name)}
      tippyOptions={{ maxWidth: 'calc(100vw - 100px)' }}
    >
      <Space>
        <Tooltip content="编辑">
          <Button size="small" type="tertiary" theme="borderless" icon={<IconEdit />} onClick={openEditLinkModal} />
        </Tooltip>

        <Divider />

        <Tooltip content="删除节点" hideOnClick>
          <Button onClick={deleteNode} icon={<IconDelete />} type="tertiary" theme="borderless" size="small" />
        </Tooltip>
      </Space>
    </BubbleMenu>
  );
};
