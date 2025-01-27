import type { SystemStyleObject } from '@invoke-ai/ui-library';
import { Button, Collapse, Flex, Icon, Spacer, Text } from '@invoke-ai/ui-library';
import { InformationalPopover } from 'common/components/InformationalPopover/InformationalPopover';
import { useBoolean } from 'common/hooks/useBoolean';
import { CanvasEntityAddOfTypeButton } from 'features/controlLayers/components/common/CanvasEntityAddOfTypeButton';
import { CanvasEntityMergeVisibleButton } from 'features/controlLayers/components/common/CanvasEntityMergeVisibleButton';
import { CanvasEntityTypeIsHiddenToggle } from 'features/controlLayers/components/common/CanvasEntityTypeIsHiddenToggle';
import { useEntityTypeInformationalPopover } from 'features/controlLayers/hooks/useEntityTypeInformationalPopover';
import { useEntityTypeTitle } from 'features/controlLayers/hooks/useEntityTypeTitle';
import { type CanvasEntityIdentifier, isRenderableEntityType } from 'features/controlLayers/store/types';
import type { PropsWithChildren } from 'react';
import { memo } from 'react';
import { PiCaretDownBold } from 'react-icons/pi';

type Props = PropsWithChildren<{
  isSelected: boolean;
  type: CanvasEntityIdentifier['type'];
}>;

const _hover: SystemStyleObject = {
  opacity: 1,
};

export const CanvasEntityGroupList = memo(({ isSelected, type, children }: Props) => {
  const title = useEntityTypeTitle(type);
  const informationalPopoverFeature = useEntityTypeInformationalPopover(type);
  const collapse = useBoolean(true);

  return (
    <Flex flexDir="column" w="full">
      <Flex w="full">
        <Flex
          flexGrow={1}
          as={Button}
          onClick={collapse.toggle}
          justifyContent="space-between"
          alignItems="center"
          gap={3}
          variant="unstyled"
          p={0}
          h={8}
        >
          <Icon
            boxSize={4}
            as={PiCaretDownBold}
            transform={collapse.isTrue ? undefined : 'rotate(-90deg)'}
            fill={isSelected ? 'base.200' : 'base.500'}
            transitionProperty="common"
            transitionDuration="fast"
          />
          {informationalPopoverFeature ? (
            <InformationalPopover feature={informationalPopoverFeature}>
              <Text
                fontWeight="semibold"
                color={isSelected ? 'base.200' : 'base.500'}
                userSelect="none"
                transitionProperty="common"
                transitionDuration="fast"
              >
                {title}
              </Text>
            </InformationalPopover>
          ) : (
            <Text
              fontWeight="semibold"
              color={isSelected ? 'base.200' : 'base.500'}
              userSelect="none"
              transitionProperty="common"
              transitionDuration="fast"
            >
              {title}
            </Text>
          )}

          <Spacer />
        </Flex>
        {isRenderableEntityType(type) && <CanvasEntityMergeVisibleButton type={type} />}
        {isRenderableEntityType(type) && <CanvasEntityTypeIsHiddenToggle type={type} />}
        <CanvasEntityAddOfTypeButton type={type} />
      </Flex>
      <Collapse in={collapse.isTrue}>
        <Flex flexDir="column" gap={2} pt={2}>
          {children}
        </Flex>
      </Collapse>
    </Flex>
  );
});

CanvasEntityGroupList.displayName = 'CanvasEntityGroupList';
