import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, ClipboardList, TrendingUp, AlertTriangle } from 'lucide-react';

const PHQ9_QUESTIONS = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed, or the opposite being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself"
];

const GAD7_QUESTIONS = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid, as if something awful might happen"
];

const RESPONSE_OPTIONS = [
  { value: "0", label: "Not at all" },
  { value: "1", label: "Several days" },
  { value: "2", label: "More than half the days" },
  { value: "3", label: "Nearly every day" }
];

interface AssessmentResult {
  score: number;
  severity: string;
  color: string;
  recommendation: string;
}

export const AssessmentTools: React.FC = () => {
  const [activeAssessment, setActiveAssessment] = useState<'phq9' | 'gad7' | null>(null);
  const [phq9Responses, setPhq9Responses] = useState<{ [key: number]: string }>({});
  const [gad7Responses, setGad7Responses] = useState<{ [key: number]: string }>({});
  const [notes, setNotes] = useState('');
  
  const calculateScore = (responses: { [key: number]: string }) => {
    return Object.values(responses).reduce((sum, value) => sum + parseInt(value || '0'), 0);
  };

  const getDepressionSeverity = (score: number): AssessmentResult => {
    if (score <= 4) return { score, severity: "Minimal", color: "success", recommendation: "No treatment needed" };
    if (score <= 9) return { score, severity: "Mild", color: "warning", recommendation: "Watchful waiting; repeat assessment in 2 weeks" };
    if (score <= 14) return { score, severity: "Moderate", color: "destructive", recommendation: "Consider counseling, follow-up" };
    if (score <= 19) return { score, severity: "Moderately Severe", color: "destructive", recommendation: "Active treatment with psychotherapy and/or medication" };
    return { score, severity: "Severe", color: "destructive", recommendation: "Immediate active treatment required" };
  };

  const getAnxietySeverity = (score: number): AssessmentResult => {
    if (score <= 4) return { score, severity: "Minimal", color: "success", recommendation: "No treatment needed" };
    if (score <= 9) return { score, severity: "Mild", color: "warning", recommendation: "Monitor symptoms" };
    if (score <= 14) return { score, severity: "Moderate", color: "destructive", recommendation: "Consider treatment options" };
    return { score, severity: "Severe", color: "destructive", recommendation: "Active treatment recommended" };
  };

  const handlePHQ9Response = (questionIndex: number, value: string) => {
    setPhq9Responses(prev => ({ ...prev, [questionIndex]: value }));
  };

  const handleGAD7Response = (questionIndex: number, value: string) => {
    setGad7Responses(prev => ({ ...prev, [questionIndex]: value }));
  };

  const isPhq9Complete = Object.keys(phq9Responses).length === PHQ9_QUESTIONS.length;
  const isGad7Complete = Object.keys(gad7Responses).length === GAD7_QUESTIONS.length;
  
  const phq9Score = calculateScore(phq9Responses);
  const gad7Score = calculateScore(gad7Responses);
  
  const phq9Result = getDepressionSeverity(phq9Score);
  const gad7Result = getAnxietySeverity(gad7Score);

  const resetAssessment = (type: 'phq9' | 'gad7') => {
    if (type === 'phq9') {
      setPhq9Responses({});
    } else {
      setGad7Responses({});
    }
    setActiveAssessment(null);
  };

  return (
    <div className="space-y-6">
      {!activeAssessment ? (
        /* Assessment Selection */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 bg-card/80 backdrop-blur-sm hover:shadow-medium transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                PHQ-9 Depression Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Patient Health Questionnaire for depression screening (9 questions)
                </p>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm font-medium mb-2">Scoring:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <span>0-4: Minimal depression</span>
                    <span>5-9: Mild depression</span>
                    <span>10-14: Moderate depression</span>
                    <span>15-19: Moderately severe</span>
                    <span className="col-span-2">20-27: Severe depression</span>
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => setActiveAssessment('phq9')}
                >
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Start PHQ-9 Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-card/80 backdrop-blur-sm hover:shadow-medium transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-secondary" />
                GAD-7 Anxiety Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Generalized Anxiety Disorder scale for anxiety screening (7 questions)
                </p>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm font-medium mb-2">Scoring:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <span>0-4: Minimal anxiety</span>
                    <span>5-9: Mild anxiety</span>
                    <span>10-14: Moderate anxiety</span>
                    <span>15-21: Severe anxiety</span>
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  variant="secondary"
                  onClick={() => setActiveAssessment('gad7')}
                >
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Start GAD-7 Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Active Assessment */
        <Card className="border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {activeAssessment === 'phq9' ? (
                  <>
                    <Brain className="h-5 w-5 text-primary" />
                    PHQ-9 Depression Assessment
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-5 w-5 text-secondary" />
                    GAD-7 Anxiety Assessment
                  </>
                )}
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setActiveAssessment(null)}
              >
                Back to Selection
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Over the last 2 weeks, how often have you been bothered by any of the following problems?
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Progress indicator */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>
                  {activeAssessment === 'phq9' 
                    ? `${Object.keys(phq9Responses).length}/${PHQ9_QUESTIONS.length}`
                    : `${Object.keys(gad7Responses).length}/${GAD7_QUESTIONS.length}`
                  }
                </span>
              </div>
              <Progress 
                value={activeAssessment === 'phq9' 
                  ? (Object.keys(phq9Responses).length / PHQ9_QUESTIONS.length) * 100
                  : (Object.keys(gad7Responses).length / GAD7_QUESTIONS.length) * 100
                }
                className="h-2"
              />
            </div>

            {/* Questions */}
            <div className="space-y-6">
              {(activeAssessment === 'phq9' ? PHQ9_QUESTIONS : GAD7_QUESTIONS).map((question, index) => (
                <div key={index} className="space-y-3">
                  <Label className="text-sm font-medium">
                    {index + 1}. {question}
                  </Label>
                  <RadioGroup
                    value={activeAssessment === 'phq9' ? phq9Responses[index] : gad7Responses[index] || ''}
                    onValueChange={(value) => 
                      activeAssessment === 'phq9' 
                        ? handlePHQ9Response(index, value)
                        : handleGAD7Response(index, value)
                    }
                  >
                    {RESPONSE_OPTIONS.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`q${index}-${option.value}`} />
                        <Label htmlFor={`q${index}-${option.value}`} className="text-sm cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
            </div>

            {/* Results */}
            {((activeAssessment === 'phq9' && isPhq9Complete) || 
              (activeAssessment === 'gad7' && isGad7Complete)) && (
              <div className="border-t pt-6">
                <div className="bg-muted/50 rounded-lg p-4 space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Assessment Results
                  </h3>
                  
                  {activeAssessment === 'phq9' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>PHQ-9 Score:</span>
                        <Badge variant={phq9Result.color as any} className="text-lg px-3 py-1">
                          {phq9Result.score}/27
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Severity:</span>
                        <Badge variant={phq9Result.color as any}>
                          {phq9Result.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        <strong>Recommendation:</strong> {phq9Result.recommendation}
                      </p>
                    </div>
                  )}
                  
                  {activeAssessment === 'gad7' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>GAD-7 Score:</span>
                        <Badge variant={gad7Result.color as any} className="text-lg px-3 py-1">
                          {gad7Result.score}/21
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Severity:</span>
                        <Badge variant={gad7Result.color as any}>
                          {gad7Result.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        <strong>Recommendation:</strong> {gad7Result.recommendation}
                      </p>
                    </div>
                  )}
                  
                  {((activeAssessment === 'phq9' && phq9Result.score >= 15) || 
                    (activeAssessment === 'gad7' && gad7Result.score >= 15)) && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="font-medium">High Risk Alert</span>
                      </div>
                      <p className="text-sm text-destructive/80 mt-1">
                        This score indicates severe symptoms requiring immediate attention and professional intervention.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Clinical Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional observations or notes about the assessment..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4">
              <Button
                disabled={!(activeAssessment === 'phq9' ? isPhq9Complete : isGad7Complete)}
                className="flex-1"
              >
                Save Assessment
              </Button>
              <Button 
                variant="outline" 
                onClick={() => resetAssessment(activeAssessment)}
                className="flex-1"
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};