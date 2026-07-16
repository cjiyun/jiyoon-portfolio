// src/components/about/AboutRecord.tsx
import styled from '@emotion/styled';

type AboutRecordProps = {
  title: string;
  score?: string;
  period: string;
  issuer?: string;
};

const AboutRecord = ({ title, score, period, issuer }: AboutRecordProps) => {
  return (
    <Wrapper>
      {/* 자격/시험명 + 성적 */}
      <TitleRow>
        <CredentialTitle>{title}</CredentialTitle>
        {score && <Score>{score}</Score>}
      </TitleRow>

      {/* 기간 + 발급기관 */}
      <MetaRow>
        <Period>{period}</Period>
        {issuer && <Issuer>{issuer}</Issuer>}
      </MetaRow>
    </Wrapper>
  );
};

export default AboutRecord;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  ${({ theme }) => theme.fonts.body5};
`;

const TitleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 10px;
`;

const CredentialTitle = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.text1};
`;

const Score = styled.span`
  color: ${({ theme }) => theme.colors.text.text2};
`;

const MetaRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
`;

const Period = styled.span`
  color: ${({ theme }) => theme.colors.text.text1};
`;

const Issuer = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.text.text4};
`;
